import React, { useState } from 'react';
import { Search, BookOpen } from 'lucide-react';
import { lookupDish, getDishSuggestions } from '../utils/dishLookup';
import { Recipe } from '../types/recipe';

interface DishLookupProps {
  onRecipeFound: (recipe: Recipe) => void;
}

export const DishLookup: React.FC<DishLookupProps> = ({ onRecipeFound }) => {
  const [dishName, setDishName] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!dishName.trim()) {
      setError('Please enter a dish name');
      return;
    }

    setIsSearching(true);
    setError('');

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const recipe = lookupDish(dishName);
    
    if (recipe) {
      onRecipeFound(recipe);
      setDishName('');
    } else {
      setError('Recipe not found. Try searching for popular dishes like "spaghetti bolognese", "chicken curry", or "caesar salad".');
    }
    
    setIsSearching(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const suggestions = getDishSuggestions(dishName);

  const handleSuggestionClick = (suggestion: string) => {
    setDishName(suggestion);
    setError('');
  };

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3 mb-4">
        <BookOpen className="h-6 w-6 text-blue-500" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Search Recipe by Dish Name
        </h2>
      </div>
      
      <div className="space-y-4">
        <div className="relative">
          <input
            type="text"
            value={dishName}
            onChange={(e) => {
              setDishName(e.target.value);
              setError('');
            }}
            onKeyPress={handleKeyPress}
            placeholder="Enter dish name (e.g., spaghetti bolognese, chicken curry, caesar salad)"
            className="w-full px-4 py-3 sm:py-3 text-base sm:text-sm bg-white/80 dark:bg-gray-800/80 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 backdrop-blur-sm transition-colors duration-200 touch-manipulation"
          />

          {suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border border-gray-300 dark:border-gray-600 rounded-lg shadow-xl z-10 max-h-48 overflow-y-auto">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full px-4 py-3 sm:py-2 text-left text-base sm:text-sm hover:bg-blue-50 dark:hover:bg-blue-900/20 active:bg-blue-100 dark:active:bg-blue-900/30 transition-colors duration-150 text-gray-900 dark:text-gray-100 first:rounded-t-lg last:rounded-b-lg touch-manipulation"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>

        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
          </div>
        )}

        <button
          onClick={handleSearch}
          disabled={isSearching || !dishName.trim()}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 text-base sm:text-sm bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 active:from-blue-700 active:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:scale-100 shadow-lg touch-manipulation"
        >
          {isSearching ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
              Searching Recipe...
            </>
          ) : (
            <>
              <Search className="h-4 w-4" />
              Find Recipe
            </>
          )}
        </button>

        <div className="text-sm sm:text-xs text-gray-500 dark:text-gray-400">
          💡 Try searching for: Spaghetti Bolognese, Chicken Curry, Caesar Salad, Beef Stir Fry, Pancakes
        </div>
      </div>
    </div>
  );
};