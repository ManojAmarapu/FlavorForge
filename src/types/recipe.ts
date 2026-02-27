export interface Recipe {
  id: string;
  title: string;
  description: string;
  cookingTime: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  ingredients: string[];
  instructions: string[];
  tags: string[];
  matchedIngredients: string[];
  isCustom?: boolean;
}

export interface RecipeGeneratorState {
  availableIngredients: string[];
  generatedRecipes: Recipe[];
  favorites: string[];
  currentRecipe: Recipe | null;
  isGenerating: boolean;
}