import React, { useState } from 'react';
import { Clock, Users, Heart, Save } from 'lucide-react';
import { Recipe } from '../types/recipe';
import { useAuth } from '../contexts/AuthContext';
import { saveRecipe } from '../services/recipeService';
import { useToast } from '../contexts/ToastContext';

interface RecipeCardProps {
  recipe: Recipe;
  isFavorite: boolean;
  onToggleFavorite: (recipeId: string) => void;
  onSelectRecipe: (recipe: Recipe) => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  isFavorite,
  onToggleFavorite,
  onSelectRecipe
}) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30';
      case 'Medium': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30';
      case 'Hard': return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30';
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  const { user, token } = useAuth();
  const { showToast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveRecipe = async () => {
    if (!token) return;

    setIsSaving(true);
    try {
      await saveRecipe(recipe, token);
      showToast('Recipe saved!', 'success');
    } catch (error: any) {
      showToast(error.message || 'Failed to save', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl active:shadow-md transition-all duration-300 overflow-hidden group border border-gray-200 dark:border-gray-700">
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-200 leading-tight">
            {recipe.title}
          </h3>
          <button
            onClick={() => onToggleFavorite(recipe.id)}
            className={`p-2 sm:p-2 rounded-full transition-all duration-200 touch-manipulation active:scale-90 ${isFavorite
              ? 'text-red-500 hover:text-red-600'
              : 'text-gray-400 hover:text-red-500'
              }`}
          >
            <Heart className={`h-5 w-5 sm:h-5 sm:w-5 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>

        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {recipe.description}
        </p>

        <div className="flex items-center gap-3 sm:gap-4 mb-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400 flex-wrap">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {recipe.cookingTime}
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {recipe.servings} servings
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(recipe.difficulty)}`}>
            {recipe.difficulty}
          </span>
        </div>

        {recipe.matchedIngredients.length > 0 && (
          <div className="mb-4">
            <p className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Matched ingredients:
            </p>
            <div className="flex flex-wrap gap-1">
              {recipe.matchedIngredients.slice(0, 3).map((ingredient, index) => (
                <span
                  key={index}
                  className="inline-block px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200 rounded text-xs leading-tight"
                >
                  {ingredient}
                </span>
              ))}
              {recipe.matchedIngredients.length > 3 && (
                <span className="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs">
                  +{recipe.matchedIngredients.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-1 sm:gap-2 mb-4">
          {recipe.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded text-xs font-medium leading-tight"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <button
              onClick={() => onSelectRecipe(recipe)}
              className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 active:from-emerald-700 active:to-teal-700 text-white font-medium py-3 px-4 text-sm sm:text-base rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg touch-manipulation"
            >
              View Recipe
            </button>

            {user && (
              <button
                onClick={handleSaveRecipe}
                disabled={isSaving}
                className="flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 font-medium py-3 px-4 text-sm sm:text-base rounded-lg transition-transform duration-200 transform hover:scale-[1.05] active:scale-[0.95] block shadow-sm border border-gray-200 dark:border-gray-600"
                title="Save to My Recipes"
              >
                {isSaving ? (
                  <div className="animate-spin h-5 w-5 border-2 border-gray-500 border-t-transparent rounded-full" />
                ) : (
                  <Save className="h-5 w-5 hover:text-emerald-500 transition-colors" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};