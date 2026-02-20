import { Recipe } from '../types/recipe';
import { recipeDatabase } from '../data/recipeDatabase';

export const generateRecipes = (availableIngredients: string[]): Recipe[] => {
  if (availableIngredients.length === 0) {
    return [];
  }

  const normalizedIngredients = availableIngredients.map(ingredient => 
    ingredient.toLowerCase().trim()
  );

  console.log('Available ingredients:', normalizedIngredients);
  const scoredRecipes = recipeDatabase.map(recipe => {
    const matchedIngredients = recipe.ingredients.filter(ingredient =>
      normalizedIngredients.some(available => 
        {
          const availableLower = available.toLowerCase();
          const ingredientLower = ingredient.toLowerCase();
          return availableLower.includes(ingredientLower) || 
                 ingredientLower.includes(availableLower) ||
                 availableLower === ingredientLower;
        }
      )
    );

    const score = matchedIngredients.length / recipe.ingredients.length;
    
    console.log(`Recipe: ${recipe.title}, Matched: ${matchedIngredients.length}/${recipe.ingredients.length}, Score: ${score}`);
    
    return {
      ...recipe,
      matchedIngredients,
      score
    };
  });

  const filteredRecipes = scoredRecipes.filter(recipe => recipe.score > 0.15); // Lowered threshold
  console.log('Filtered recipes:', filteredRecipes.length);

  return filteredRecipes
    .sort((a, b) => b.score - a.score)
    .slice(0, 6) // Return top 6 recipes
    .map(({ score, ...recipe }) => recipe);
};

export const getRandomRecipes = (count: number = 3): Recipe[] => {
  const shuffled = [...recipeDatabase].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};