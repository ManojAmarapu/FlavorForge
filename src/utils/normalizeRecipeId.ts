import { Recipe } from '../types/recipe';

export const getRecipeId = (recipe: Recipe | any): string => {
    if (!recipe) return '';
    const id = recipe._id ?? recipe.id;
    return id ? id.toString() : '';
};
