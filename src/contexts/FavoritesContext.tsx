import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Recipe } from '../types/recipe';
import { getCanonicalId } from '../utils/normalizeRecipeId';
import { useToast } from './ToastContext';
import { useModal } from './ModalContext';

interface FavoritesContextType {
    favorites: Map<string, Recipe>;
    toggleFavorite: (recipe: Recipe | any) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [favorites, setFavorites] = useState<Map<string, Recipe>>(new Map());
    const { showToast } = useToast();
    const { showModal } = useModal();
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
