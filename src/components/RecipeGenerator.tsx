import React, { useState, useEffect } from 'react';
import { ChefHat, Sparkles, Heart, Utensils } from 'lucide-react';
import { Recipe } from '../types/recipe';
import { generateRecipes, getRandomRecipes } from '../utils/recipeGenerator';
import { generateMultipleCustomRecipes } from '../utils/customRecipeGenerator';
import { IngredientInput } from './IngredientInput';
import { DishLookup } from './DishLookup';
import { RecipeCard } from './RecipeCard';
import { Skeleton } from './ui/Skeleton';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFavorites } from '../contexts/FavoritesContext';

export const RecipeGenerator: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'ingredients' | 'dish'>('ingredients');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);

  const { favorites } = useFavorites();

  useEffect(() => {
    // Generate fresh recipes on mount, tab change, or navigation return (location.key change)
    if (activeTab === 'ingredients' && ingredients.length === 0) {
      setRecipes(getRandomRecipes(6));
    } else if (activeTab === 'ingredients' && ingredients.length > 0) {
      const customRecipes = generateMultipleCustomRecipes(ingredients);
      const databaseRecipes = generateRecipes(ingredients);
      setRecipes([...customRecipes, ...databaseRecipes]);
    } else {
      setRecipes(getRandomRecipes(6));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.key, activeTab]);

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

  const handleSelectRecipe = (recipe: Recipe) => {
    navigate(`/recipe/${recipe.id}`, { state: { recipe, from: 'dashboard' } });
  };

  const favoriteRecipes = favorites;
  const displayRecipes = showFavorites ? favoriteRecipes : recipes;

  return (
    <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 px-4 sm:px-0">
      <div className="flex justify-center mb-8">
        <div className="flex items-center gap-4">
          <div className="bg-white rounded-full p-3 shadow-lg shadow-emerald-400/20">
            <img
              src="/apple-touch-icon.png"
              alt="FlavorForge Logo"
              className="w-12 h-12 object-contain drop-shadow-lg"
            />
          </div>
          <div className="text-left">
            <h1 className="text-3xl font-bold brand-title text-gray-900 dark:text-gray-100">
              FlavorForge
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Your AI Culinary Companion
            </p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-1 sm:p-2 shadow-lg border border-gray-200 dark:border-gray-700 w-full max-w-md sm:w-auto">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('ingredients')}
              className={`flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium text-sm sm:text-base transition-all duration-200 flex-1 sm:flex-none touch-manipulation ${activeTab === 'ingredients'
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
              className={`flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium text-sm sm:text-base transition-all duration-200 flex-1 sm:flex-none touch-manipulation ${activeTab === 'dish'
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
              className={`flex items-center justify-center gap-2 px-6 py-3 text-sm sm:text-base font-medium rounded-lg transition-all duration-200 shadow-lg touch-manipulation active:scale-95 ${showFavorites
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
            {isGenerating ? (
              Array.from({ length: 6 }).map((_, index) => (
                <div key={`skeleton-${index}`} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <Skeleton className="h-6 w-2/3" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </div>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-6 w-20 rounded-full" />
                    <Skeleton className="h-6 w-16 rounded-full" />
                  </div>
                  <Skeleton className="h-10 w-full mt-4" />
                </div>
              ))
            ) : (
              displayRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onSelectRecipe={handleSelectRecipe}
                />
              ))
            )}
          </div>
        </div>
      )}

      {showFavorites && favoriteRecipes.length === 0 && (
        <div className="text-center py-12 sm:py-16 bg-white/50 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700 mx-4 sm:mx-0 shadow-sm transition-all duration-300">
          <div className="bg-red-50 dark:bg-red-900/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="h-10 w-10 text-red-400 dark:text-red-500" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
            No favorite recipes yet
          </h3>
          <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-md mx-auto px-4 mb-8">
            Start exploring recipes and add them to your favorites to access them quickly later!
          </p>
          <button
            onClick={() => setShowFavorites(false)}
            className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 font-medium transition-all duration-200 inline-flex items-center gap-2 touch-manipulation shadow-sm"
          >
            ← Back to All Recipes
          </button>
        </div>
      )}

      {!showFavorites && displayRecipes.length === 0 && !isGenerating && (
        <div className="text-center py-16 bg-gradient-to-b from-white/50 to-transparent dark:from-gray-800/50 dark:to-transparent rounded-3xl mx-4 sm:mx-0 transition-all duration-500 border border-emerald-100/50 dark:border-emerald-900/20 shadow-sm">
          <div className="bg-emerald-50 dark:bg-emerald-900/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 transform hover:scale-110 transition-transform duration-300 shadow-inner">
            <ChefHat className="h-12 w-12 text-emerald-500 dark:text-emerald-400" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4 tracking-tight">
            Ready to cook something amazing?
          </h3>
          <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-lg mx-auto px-4 leading-relaxed">
            Enter your available ingredients above or search for a specific dish to generate delicious recipes instantly!
          </p>
        </div>
      )}
    </div>
  );
};