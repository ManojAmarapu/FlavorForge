import { Recipe } from '../types/recipe';

export const getCanonicalId = (recipe: Recipe | any): string => {
    if (!recipe) return '';
    const rawId = recipe.id ?? recipe.recipeId ?? recipe._id;
    if (!rawId) return '';
    
    // Always strip 'fav_' prefix so favorites & saved maps stay perfectly synced
    // pointing to the same base canonical recipe ID.
    const stringId = rawId.toString();
    return stringId.replace(/^fav_/, '');
};
