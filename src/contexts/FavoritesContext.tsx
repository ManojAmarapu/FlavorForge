import React, { createContext, useContext, useState, useEffect } from 'react';
import { Recipe } from '../types/recipe';

interface FavoritesContextType {
    favorites: Recipe[];
    toggleFavorite: (recipe: Recipe) => void;
    isFavorite: (id: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [favorites, setFavorites] = useState<Recipe[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem("flavorforge_favorites");
        if (stored) {
            setFavorites(JSON.parse(stored));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("flavorforge_favorites", JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (recipe: Recipe | any) => {
        setFavorites(prev => {
            const exists = prev.find(r => (r.id || (r as any)._id) === (recipe.id || recipe._id));
            if (exists) {
                return prev.filter(r => (r.id || (r as any)._id) !== (recipe.id || recipe._id));
            }
            return [...prev, recipe];
        });
    };

    const isFavorite = (id: string) => favorites.some(r => (r.id || (r as any)._id) === id);

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
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
