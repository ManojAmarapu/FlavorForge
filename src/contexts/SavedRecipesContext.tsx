import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Recipe } from '../types/recipe';
import { getCanonicalId } from '../utils/normalizeRecipeId';
import { useToast } from './ToastContext';
import { useModal } from './ModalContext';
import { useAuth } from './AuthContext';
import { getMyRecipes, saveRecipe, deleteRecipe } from '../services/recipeService';

interface SavedRecipesContextType {
    savedRecipes: Map<string, Recipe>;
    toggleSaved: (recipe: Recipe | any) => Promise<boolean>;
    isSaving: boolean;
}

const SavedRecipesContext = createContext<SavedRecipesContextType | undefined>(undefined);

export const SavedRecipesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [savedRecipes, setSavedRecipes] = useState<Map<string, Recipe>>(new Map());
    const [isSaving, setIsSaving] = useState(false);
    const { showToast } = useToast();
    const { showModal } = useModal();
    const { user } = useAuth();
    const undoTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem("flavorforge_saved");
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed)) {
                    const map = new Map<string, Recipe>();
                    parsed.forEach((f: any) => {
                        if (f && typeof f === 'object' && Object.keys(f).length > 0) {
                            const id = getCanonicalId(f);
                            if (id) {
                                map.set(id, f);
                            }
                        }
                    });
                    setSavedRecipes(map);
                    localStorage.setItem("flavorforge_saved", JSON.stringify(Array.from(map.values())));
                }
            } catch (error) {
                console.error("Failed to parse saved, resetting", error);
                setSavedRecipes(new Map());
                localStorage.removeItem("flavorforge_saved");
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("flavorforge_saved", JSON.stringify(Array.from(savedRecipes.values())));
    }, [savedRecipes]);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const fetchServerSaved = async () => {
            const token = localStorage.getItem('auth_token');
            if (!user || !token) return;
            try {
                const data = await getMyRecipes(token, controller.signal);
                if (isMounted && Array.isArray(data)) {
                    setSavedRecipes(() => {
                        const newMap = new Map();
                        const seenTitles = new Set<string>();

                        data.forEach((item: any) => {
                            const recipe = item.recipe || item;
                            const isFav = recipe?._isFavoriteFlag === true || (item.recipeId && item.recipeId.startsWith('fav_'));

                            if (recipe && !isFav) { // EXACT INVERSE OF FAVORITESCONTEXT
                                const normalizedTitle = (recipe.title || '').toLowerCase().trim();
                                if (seenTitles.has(normalizedTitle)) {
                                    if (item._id) deleteRecipe(item._id, token).catch(() => {});
                                    return; // Silently prune duplicates
                                }
                                seenTitles.add(normalizedTitle);

                                if (item._id) recipe._mongoId = item._id;
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
                    console.error("Failed to sync saved from server:", err);
                }
            }
        };

        fetchServerSaved();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, [user]);

    const toggleSaved = async (recipe: Recipe | any): Promise<boolean> => {
        const id = getCanonicalId(recipe);
        if (!id) return false;

        const token = localStorage.getItem('auth_token');
        if (!user || !token) {
            showToast('Please log in to save recipes', 'error');
            return false;
        }

        if (savedRecipes.has(id)) {
            return new Promise((resolve) => {
                showModal({
                    title: "Remove Saved Recipe?",
                    message: "Are you sure you want to remove this from your saved recipes?",
                    type: "warning",
                    confirmText: "Remove",
                    cancelText: "Cancel",
                    showCancel: true,
                    onConfirm: () => {
                        setSavedRecipes(prev => {
                            const newMap = new Map(prev);
                            newMap.delete(id);
                            return newMap;
                        });

                        if (undoTimeoutRef.current) clearTimeout(undoTimeoutRef.current);

                        showToast('Recipe removed', 'info', 'Undo', () => {
                            if (undoTimeoutRef.current) clearTimeout(undoTimeoutRef.current);
                            setSavedRecipes(prev => {
                                const newMap = new Map(prev);
                                newMap.set(id, recipe);
                                return newMap;
                            });
                        });

                        undoTimeoutRef.current = setTimeout(() => {
                            const targetRecipe = savedRecipes.get(id) || recipe;
                            const mongoId = targetRecipe._mongoId || targetRecipe._id;
                            if (mongoId) {
                                deleteRecipe(mongoId, token).catch(console.error);
                            }
                        }, 5000);
                        resolve(true);
                    }
                });
            });
        }

        // Optimistic Updating UI
        setIsSaving(true);
        setSavedRecipes(prev => {
            const newMap = new Map(prev);
            newMap.set(id, recipe);
            return newMap;
        });

        try {
            const data = await saveRecipe(recipe, user.id, token, false);
            setSavedRecipes(prev => {
                const newMap = new Map(prev);
                const updatedRecipe = { ...recipe, _mongoId: data?.recipe?._id || data?._id };
                newMap.set(id, updatedRecipe);
                return newMap;
            });
            showToast('Recipe saved!', 'success');
            return true;
        } catch (error: any) {
            console.error("Save Error:", error);
            const errMsg = (error.message || '').toLowerCase();
            if (errMsg.includes('already saved') || errMsg.includes('invalid recipe')) {
                // Keep the optimistic update
            } else {
                setSavedRecipes(prev => {
                    const newMap = new Map(prev);
                    newMap.delete(id);
                    return newMap;
                });
                showToast(error.message || 'Failed to save', 'error');
            }
            return false;
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <SavedRecipesContext.Provider value={{ savedRecipes, toggleSaved, isSaving }}>
            {children}
        </SavedRecipesContext.Provider>
    );
};

export const useSavedRecipes = () => {
    const context = useContext(SavedRecipesContext);
    if (context === undefined) {
        throw new Error('useSavedRecipes must be used within a SavedRecipesProvider');
    }
    return context;
};
