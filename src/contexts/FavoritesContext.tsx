import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Recipe } from '../types/recipe';
import { getCanonicalId } from '../utils/normalizeRecipeId';
import { useToast } from './ToastContext';
import { useModal } from './ModalContext';

interface FavoritesContextType {
    favorites: Recipe[];
    toggleFavorite: (recipe: Recipe | any) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [favoritesMap, setFavoritesMap] = useState<Map<string, Recipe>>(new Map());
    const { showToast } = useToast();
    const { showModal } = useModal();
    const undoTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const favorites = Array.from(favoritesMap.values());

    useEffect(() => {
        const stored = localStorage.getItem("flavorforge_favorites");
        if (stored) {
            const parsed = JSON.parse(stored);
            const map = new Map<string, Recipe>();
            parsed.forEach((f: any) => {
                const id = getCanonicalId(f);
                if (id) map.set(id, f);
            });
            setFavoritesMap(map);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("flavorforge_favorites", JSON.stringify(Array.from(favoritesMap.values())));
    }, [favoritesMap]);

    const toggleFavorite = (recipe: Recipe | any) => {
        const id = getCanonicalId(recipe);
        if (!id) return;

        if (favoritesMap.has(id)) {
            showModal({
                title: "Remove from Favorites?",
                message: "Are you sure you want to remove this recipe from favorites?",
                type: "warning",
                confirmText: "Remove",
                cancelText: "Cancel",
                showCancel: true,
                onConfirm: () => {
                    setFavoritesMap(prev => {
                        const newMap = new Map(prev);
                        newMap.delete(id);
                        return newMap;
                    });

                    if (undoTimeoutRef.current) clearTimeout(undoTimeoutRef.current);

                    showToast('Removed from Favorites', 'info', 'Undo', () => {
                        if (undoTimeoutRef.current) clearTimeout(undoTimeoutRef.current);
                        setFavoritesMap(prev => {
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

        setFavoritesMap(prev => {
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
