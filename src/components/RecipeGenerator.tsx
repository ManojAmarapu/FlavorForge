import React, { useState, useEffect } from 'react';
import { ChefHat, Sparkles, Heart, Utensils } from 'lucide-react';
import { Recipe } from '../types/recipe';
import { generateRecipes, getRandomRecipes } from '../utils/recipeGenerator';
import { generateMultipleCustomRecipes } from '../utils/customRecipeGenerator';
import { IngredientInput } from './IngredientInput';
import { DishLookup } from './DishLookup';
import { RecipeCard } from './RecipeCard';
import { RecipeDetail } from './RecipeDetail';

export const RecipeGenerator: React.FC = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [activeTab, setActiveTab] = useState<'ingredients' | 'dish'>('ingredients');

  useEffect(() => {
    const savedFavorites = localStorage.getItem('recipe-favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    
    // Show random recipes on initial load
    setRecipes(getRandomRecipes(6));
  }, []);

  useEffect(() => {
    localStorage.setItem('recipe-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleIngredientsChange = (newIngredients: string[]) => {
    setIngredients(newIngredients);
  };

  const handleGenerateRecipes = async () => {
    if (ingredients.length === 0) {
      alert('Please enter some ingredients first!');
      return;
    }
    
    setIsGenerating(true);
    setShowFavorites(false);
    
    // Simulate API call delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // Generate multiple custom recipes with user's exact ingredients
    const customRecipes = generateMultipleCustomRecipes(ingredients);
    
    // Also find matching recipes from database
    const databaseRecipes = generateRecipes(ingredients);
    
    // Combine custom recipes with database matches
    const allRecipes = [...customRecipes, ...databaseRecipes];
    
    setRecipes(allRecipes);
    setIsGenerating(false);
  };

  const handleRecipeFound = (recipe: Recipe) => {
    setRecipes([recipe]);
    setShowFavorites(false);
  };

  const handleToggleFavorite = (recipeId: string) => {
    setFavorites(prev => 
      prev.includes(recipeId) 
        ? prev.filter(id => id !== recipeId)
        : [...prev, recipeId]
    );
  };

  const handleSelectRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleBack = () => {
    setSelectedRecipe(null);
  };

  const favoriteRecipes = recipes.filter(recipe => favorites.includes(recipe.id));
  const displayRecipes = showFavorites ? favoriteRecipes : recipes;

  if (selectedRecipe) {
    return (
      <RecipeDetail
        recipe={selectedRecipe}
        isFavorite={favorites.includes(selectedRecipe.id)}
        onToggleFavorite={handleToggleFavorite}
        onBack={handleBack}
      />
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 px-4 sm:px-0">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <ChefHat className="h-7 w-7 sm:h-8 sm:w-8 text-emerald-500" />
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100">
            Recipe Generator
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg max-w-2xl mx-auto px-4 sm:px-0">
          Create custom recipes from your ingredients or search for specific dishes with detailed instructions
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-1 sm:p-2 shadow-lg border border-gray-200 dark:border-gray-700 w-full max-w-md sm:w-auto">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('ingredients')}
              className={`flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium text-sm sm:text-base transition-all duration-200 flex-1 sm:flex-none touch-manipulation ${
                activeTab === 'ingredients'
                  ? 'bg-emerald-500 text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <Utensils className="h-4 w-4 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">From Ingredients</span>
              <span className="sm:hidden">Ingredients</span>
            </button>
            <button
              onClick={() => setActiveTab('dish')}
              className={`flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium text-sm sm:text-base transition-all duration-200 flex-1 sm:flex-none touch-manipulation ${
                activeTab === 'dish'
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <ChefHat className="h-4 w-4 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">By Dish Name</span>
              <span className="sm:hidden">Dish Name</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'ingredients' ? (
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <Utensils className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-500" />
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">
              Create Recipe from Your Ingredients
            </h2>
          </div>
          <IngredientInput onIngredientsChange={handleIngredientsChange} />
          
          {ingredients.length > 0 && (
            <div className="mt-4">
              <p className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Your ingredients ({ingredients.length}):
              </p>
              <div className="flex flex-wrap gap-2">
                {ingredients.map((ingredient, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 sm:px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200 rounded-full text-xs sm:text-sm font-medium"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6">
            <button
              onClick={handleGenerateRecipes}
              disabled={isGenerating}
              className="flex items-center justify-center gap-2 px-6 py-3 text-sm sm:text-base bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 active:from-emerald-700 active:to-teal-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:scale-100 shadow-lg touch-manipulation"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                  Creating Recipe...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Generate Recipe
                </>
              )}
            </button>
            
            <button
              onClick={() => setShowFavorites(!showFavorites)}
              className={`flex items-center justify-center gap-2 px-6 py-3 text-sm sm:text-base font-medium rounded-lg transition-all duration-200 shadow-lg touch-manipulation active:scale-95 ${
                showFavorites
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
              }`}
            >
              <Heart className={`h-4 w-4 ${showFavorites ? 'fill-current' : ''}`} />
              <span className="hidden sm:inline">
                {showFavorites ? 'Show All Recipes' : `Favorites (${favorites.length})`}
              </span>
              <span className="sm:hidden">
                {showFavorites ? 'All' : `♥ ${favorites.length}`}
              </span>
            </button>
          </div>
        </div>
      ) : (
        <DishLookup onRecipeFound={handleRecipeFound} />
      )}

      {displayRecipes.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100">
              {showFavorites ? 'Your Favorite Recipes' : 'Recipe Suggestions'}
            </h2>
            <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              {displayRecipes.length} recipe{displayRecipes.length !== 1 ? 's' : ''} found
            </div>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {displayRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                isFavorite={favorites.includes(recipe.id)}
                onToggleFavorite={handleToggleFavorite}
                onSelectRecipe={handleSelectRecipe}
              />
            ))}
          </div>
        </div>
      )}

      {showFavorites && favoriteRecipes.length === 0 && (
        <div className="text-center py-8 sm:py-12">
          <Heart className="h-16 w-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            No favorite recipes yet
          </h3>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 px-4">
            Start exploring recipes and add them to your favorites!
          </p>
        </div>
      )}

      {!showFavorites && displayRecipes.length === 0 && !isGenerating && (
        <div className="text-center py-8 sm:py-12">
          <ChefHat className="h-16 w-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Ready to cook something amazing?
          </h3>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 px-4">
            Enter your available ingredients or search for a specific dish to get started!
          </p>
        </div>
      )}
    </div>
  );
};