import { Recipe } from '../types/recipe';

export const getRecipeId = (recipe: Recipe | any) => {
    return recipe._id ?? recipe.id;
};
