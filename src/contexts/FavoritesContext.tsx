import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Recipe } from '../types/recipe';
import { getRecipeId } from '../utils/normalizeRecipeId';
import { useModal } from './ModalContext';

interface FavoritesContextType {
    favorites: Recipe[];
    toggleFavorite: (recipe: Recipe | any) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [favorites, setFavorites] = useState<Recipe[]>([]);
    const { showModal } = useModal();
    const undoTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [pendingRemoval, setPendingRemoval] = useState<Recipe | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem("flavorforge_favorites");
        if (stored) {
            setFavorites(JSON.parse(stored));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("flavorforge_favorites", JSON.stringify(favorites));
    }, [favorites]);

    const confirmRemove = (recipe: Recipe | any) => {
        setFavorites(prev => prev.filter(r => getRecipeId(r) !== getRecipeId(recipe)));
        setPendingRemoval(recipe);

        if (undoTimeoutRef.current) {
            clearTimeout(undoTimeoutRef.current);
        }

        setTimeout(() => {
            showModal({
                title: "Removed from Favorites",
                message: "Recipe removed. You can undo this action.",
                type: "info",
                confirmText: "Undo",
                showCancel: false,
                onConfirm: () => {
                    if (undoTimeoutRef.current) clearTimeout(undoTimeoutRef.current);
                    setFavorites(prev => [...prev, recipe]);
                    setPendingRemoval(null);
                }
            });
        }, 0);

        undoTimeoutRef.current = setTimeout(() => {
            setPendingRemoval(null);
        }, 5000);
    };

    const toggleFavorite = (recipe: Recipe | any) => {
        const exists = favorites.some(f => getRecipeId(f) === getRecipeId(recipe));

        if (exists) {
            showModal({
                title: "Remove from Favorites?",
                message: "Are you sure you want to remove this recipe from your favorites?",
                type: "warning",
                confirmText: "Remove",
                cancelText: "Keep",
                showCancel: true,
                onConfirm: () => confirmRemove(recipe)
            });
            return;
        }

        // Technically already checked by `exists`. Including strictly to match requirements cleanly if race condition occurs
        const duplicate = favorites.some(f => getRecipeId(f) === getRecipeId(recipe));
        if (duplicate) {
            showModal({
                title: "Already in Favorites",
                message: "This recipe is already added to your favorites.",
                type: "info",
                confirmText: "OK",
                showCancel: false
            });
            return;
        }

        setFavorites(prev => [...prev, recipe]);
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
