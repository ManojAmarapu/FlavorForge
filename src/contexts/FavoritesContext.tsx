import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Recipe } from '../types/recipe';
import { getCanonicalId } from '../utils/normalizeRecipeId';
import { useToast } from './ToastContext';
import { useModal } from './ModalContext';
import { useAuth } from './AuthContext';
import { getMyRecipes, saveRecipe, deleteRecipe } from '../services/recipeService';

interface FavoritesContextType {
    favorites: Map<string, Recipe>;
    toggleFavorite: (recipe: Recipe | any) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [favorites, setFavorites] = useState<Map<string, Recipe>>(new Map());
    const { showToast } = useToast();
    const { showModal } = useModal();
    const { user } = useAuth();
    const undoTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem("flavorforge_favorites");
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed)) {
                    const map = new Map<string, Recipe>();
                    parsed.forEach((f: any) => {
                        // Filter out undefined or invalid recipes
                        if (f && typeof f === 'object' && Object.keys(f).length > 0) {
                            const id = getCanonicalId(f);
                            if (id) {
                                map.set(id, f);
                            }
                        }
                    });
                    setFavorites(map);
                    // Overwrite cleaned data back into localStorage
                    localStorage.setItem("flavorforge_favorites", JSON.stringify(Array.from(map.values())));
                }
            } catch (error) {
                // Add try/catch reset fallback
                console.error("Failed to parse favorites, resetting", error);
                setFavorites(new Map());
                localStorage.removeItem("flavorforge_favorites");
            }
        }
    }, []);

    useEffect(() => {
        // Only run if not strictly initial mount logic
        localStorage.setItem("flavorforge_favorites", JSON.stringify(Array.from(favorites.values())));
    }, [favorites]);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const fetchServerFavorites = async () => {
            const token = localStorage.getItem('auth_token');
            if (!user || !token) return;
            try {
                const data = await getMyRecipes(token, controller.signal);
                if (isMounted && Array.isArray(data)) {
                    setFavorites(() => {
                        const newMap = new Map(); // Completely replace local stale cache
                        const seenTitles = new Set<string>();

                        data.forEach((item: any) => {
                            const recipe = item.recipe || item;
                            const isFav = recipe?._isFavoriteFlag === true || (item.recipeId && item.recipeId.startsWith('fav_'));

                            if (recipe && isFav) {
                                const normalizedTitle = (recipe.title || '').toLowerCase().trim();
                                if (seenTitles.has(normalizedTitle)) {
                                    if (item._id) deleteRecipe(item._id, token).catch(() => {});
                                    return; // Silently prune duplicates
                                }
                                seenTitles.add(normalizedTitle);

                                if (item._id) recipe._mongoId = item._id; // Store exact MongoDB _id for deletions
                                const canonical = getCanonicalId(recipe);
                                if (canonical) {
                                    newMap.set(canonical, recipe);
                                }
                            }
                        });
                        return newMap;
                    });
                }
            } catch (err: any) {
                if (err.name !== 'AbortError') {
                    console.error("Failed to sync favorites from server:", err);
                }
            }
        };

        fetchServerFavorites();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, [user]);

    const toggleFavorite = (recipe: Recipe | any) => {
        const id = getCanonicalId(recipe);
        if (!id) return;

        if (favorites.has(id)) {
            showModal({
                title: "Remove from Favorites?",
                message: "Are you sure you want to remove this recipe from favorites?",
                type: "warning",
                confirmText: "Remove",
                cancelText: "Cancel",
                showCancel: true,
                onConfirm: () => {
                    setFavorites(prev => {
                        const newMap = new Map(prev);
                        newMap.delete(id);
                        return newMap;
                    });

                    if (undoTimeoutRef.current) clearTimeout(undoTimeoutRef.current);

                    showToast('Removed from Favorites', 'info', 'Undo', () => {
                        if (undoTimeoutRef.current) clearTimeout(undoTimeoutRef.current);
                        setFavorites(prev => {
                            const newMap = new Map(prev);
                            newMap.set(id, recipe);
                            return newMap;
                        });
                    });

                    undoTimeoutRef.current = setTimeout(() => {
                        // Time expires, removal finalized
                        const targetRecipe = favorites.get(id) || recipe;
                        const mongoId = targetRecipe._mongoId || targetRecipe._id;
                        const token = localStorage.getItem('auth_token');
                        if (mongoId && token) {
                            deleteRecipe(mongoId, token).catch(console.error);
                        }
                    }, 5000);
                }
            });
            return;
        }

        setFavorites(prev => {
            const newMap = new Map(prev);
            newMap.set(id, recipe);
            return newMap;
        });

        // Sync new favorite to backend securely isolated via _isFavoriteFlag routing
        const token = localStorage.getItem('auth_token');
        if (user && token) {
            saveRecipe(recipe, user.id, token, true)
                .then(data => {
                    if (data && data.recipe && data.recipe._id) {
                        setFavorites(prev => {
                            if (!prev.has(id)) return prev;
                            const newMap = new Map(prev);
                            const updatedRecipe = { ...(newMap.get(id) as Recipe), _mongoId: data.recipe._id };
                            newMap.set(id, updatedRecipe);
                            return newMap;
                        });
                    }
                })
                .catch((error: any) => {
                    console.error("Save Error:", error);
                    const errMsg = (error.message || '').toLowerCase();
                    if (errMsg.includes('already saved') || errMsg.includes('invalid recipe')) {
                        // Keep the optimistic update
                    } else {
                        setFavorites(prev => {
                            const newMap = new Map(prev);
                            newMap.delete(id);
                            return newMap;
                        });
                        showToast(error.message || 'Failed to save to favorites', 'error');
                    }
                });
        }
    };

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (context === undefined) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
};
