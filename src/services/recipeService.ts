import { Recipe } from '../types/recipe';
import { getCanonicalId } from '../utils/normalizeRecipeId';

const API_URL = 'https://flavorforge-tgch.onrender.com/api';

export const saveRecipe = async (recipe: Recipe | any, userId: string, token: string, isFavorite: boolean = false) => {
    const baseId = getCanonicalId(recipe);
    if (!baseId) throw new Error("Missing recipe ID during save validation");

    const backendRecipeId = isFavorite ? `fav_${baseId}` : baseId;

    // Prevent MongoDB Duplicate Key collisions and Schema Validation crashes
    // by strictly pruning all internal or legacy metadata artifacts from cross-mapped payloads.
    const cleanRecipe = Object.keys(recipe || {}).reduce((acc: any, key) => {
        if (!key.startsWith('_') && !['userId', 'recipeId', 'id', 'createdAt', 'updatedAt', '__v'].includes(key)) {
            acc[key] = recipe[key];
        }
        return acc;
    }, {});

    const payloadRecipe = { ...cleanRecipe, id: backendRecipeId, _isFavoriteFlag: isFavorite };

    const response = await fetch(`${API_URL}/recipes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            userId,
            recipeId: backendRecipeId,
            recipe: payloadRecipe
        }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to save recipe');
    }

    return response.json();
};

export const getMyRecipes = async (token: string, signal?: AbortSignal) => {
    const timestamp = Date.now();
    const response = await fetch(`${API_URL}/recipes?t=${timestamp}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
        },
        signal
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
