import { Recipe } from '../types/recipe';

const API_URL = 'https://flavorforge-tgch.onrender.com/api';

export const saveRecipe = async (recipe: Recipe, userId: string, token: string) => {
    const response = await fetch(`${API_URL}/recipes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            userId,
            recipeId: recipe.id,
            recipe
        }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to save recipe');
    }

    return response.json();
};

export const getMyRecipes = async (token: string) => {
    const response = await fetch(`${API_URL}/recipes`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch recipes');
    }

    return response.json();
};

export const deleteRecipe = async (id: string, token: string) => {
    const response = await fetch(`${API_URL}/recipes/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to delete recipe');
    }

    return response.json();
};
