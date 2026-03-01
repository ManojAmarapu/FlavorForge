import { Recipe } from '../types/recipe';

export const getCanonicalId = (recipe: Recipe | any): string => {
    if (!recipe) return '';
    const id = recipe._id ?? recipe.id ?? recipe.recipeId;
    return id ? id.toString() : '';
};
