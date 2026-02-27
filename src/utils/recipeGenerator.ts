import { Recipe } from '../types/recipe';
import { RECIPE_POOL } from '../data/recipePool';

// Helper to generate a fast pseudo-unique ID since we aren't saving these to a DB initially
const generateId = () => Math.random().toString(36).substring(2, 9);

// Helper to shuffle an array
const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Helper to apply micro variations to a recipe clone
const applyMicroVariations = (base: Omit<Recipe, 'id' | 'createdAt' | 'matchedIngredients'>, matchedIngredients: string[] = []): Recipe => {
  // Randomize cooking time +/- 5 minutes (min 5)
  const timeVariance = Math.floor(Math.random() * 11) - 5;
  const newTime = Math.max(5, base.cookingTime + timeVariance);

  return {
    ...base,
    id: generateId(),
    cookingTime: newTime,
    tags: shuffleArray(base.tags),
    matchedIngredients,
    createdAt: new Date()
  };
};

export const generateRecipes = (availableIngredients: string[]): Recipe[] => {
  if (availableIngredients.length === 0) {
    return [];
  }

  const normalizedInput = availableIngredients
    .join(',')
    .toLowerCase()
    .split(',')
    .map(i => i.trim())
    .filter(Boolean);

  const scoredRecipes = RECIPE_POOL.map(recipe => {
    // Count how many recipe ingredients are satisfied by the user's input
    const matched = recipe.ingredients.filter(recipeIng => {
      const ingLower = recipeIng.toLowerCase();
      // Match if the user's input is found in the ingredient string, or vice versa
      return normalizedInput.some(input =>
        ingLower.includes(input) || input.includes(ingLower)
      );
    });

    const score = matched.length / recipe.ingredients.length;
    return { recipe, matched, score };
  });

  // Sort descending by score
  scoredRecipes.sort((a, b) => b.score - a.score);

  // Take top 10
  const top10 = scoredRecipes.slice(0, 10);

  // Shuffle the top 10 to add dynamic variety
  const shuffledTop10 = shuffleArray(top10);

  // Take the new top 6 and apply micro-variations
  return shuffledTop10
    .slice(0, 6)
    .map(item => applyMicroVariations(item.recipe, item.matched));
};

export const getRandomRecipes = (count: number = 3): Recipe[] => {
  const shuffled = shuffleArray(RECIPE_POOL);
  return shuffled
    .slice(0, count)
    .map(recipe => applyMicroVariations(recipe));
};