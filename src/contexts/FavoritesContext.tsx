import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Recipe } from '../types/recipe';
import { getRecipeId } from '../utils/normalizeRecipeId';
import { useToast } from './ToastContext';

interface FavoritesContextType {
    favorites: Recipe[];
    toggleFavorite: (recipe: Recipe | any) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [favorites, setFavorites] = useState<Recipe[]>([]);
    const { showToast } = useToast();
    const undoTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem("flavorforge_favorites");
        if (stored) {
            const parsed = JSON.parse(stored);
            const uniqueFavorites = Array.from(
                new Map(parsed.map((f: any) => [getRecipeId(f).toString(), f])).values()
            ) as Recipe[];
            setFavorites(uniqueFavorites);
        }
    }, []);

    useEffect(() => {
        const uniqueFavorites = Array.from(
            new Map(favorites.map((f: any) => [getRecipeId(f).toString(), f])).values()
        ) as Recipe[];
        localStorage.setItem("flavorforge_favorites", JSON.stringify(uniqueFavorites));
    }, [favorites]);

    const toggleFavorite = (recipe: Recipe | any) => {
        const isFav = favorites.some(f => getRecipeId(f).toString() === getRecipeId(recipe).toString());

        if (isFav) {
            setFavorites(prev => prev.filter(r => getRecipeId(r).toString() !== getRecipeId(recipe).toString()));

            if (undoTimeoutRef.current) clearTimeout(undoTimeoutRef.current);

            showToast('Removed from Favorites', 'info', 'Undo', () => {
                if (undoTimeoutRef.current) clearTimeout(undoTimeoutRef.current);
                setFavorites(prev => {
                    const uniqueFavorites = Array.from(
                        new Map([...prev, recipe].map((r: any) => [getRecipeId(r).toString(), r])).values()
                    ) as Recipe[];
                    return uniqueFavorites;
                });
            });

            undoTimeoutRef.current = setTimeout(() => {
                // Time expires, removal finalized
            }, 5000);
            return;
        }

        setFavorites(prev => {
            const uniqueFavorites = Array.from(
                new Map([...prev, recipe].map((r: any) => [getRecipeId(r).toString(), r])).values()
            ) as Recipe[];
            return uniqueFavorites;
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
