import { Recipe } from '../types/recipe';

export const getCanonicalId = (recipe: Recipe | any): string => {
    if (!recipe) return '';
    const id = recipe.id ?? recipe.recipeId ?? recipe._id;
    return id ? id.toString() : '';
};
