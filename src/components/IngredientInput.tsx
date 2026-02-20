import React, { useState } from 'react';
import { ingredientSuggestions } from '../data/recipeDatabase';

interface IngredientInputProps {
  onIngredientsChange: (ingredients: string[]) => void;
}

export const IngredientInput: React.FC<IngredientInputProps> = ({
  onIngredientsChange
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    
    // Parse comma-separated ingredients
    const ingredients = value
      .split(',')
      .map(ingredient => ingredient.trim())
      .filter(ingredient => ingredient.length > 0);
    
    onIngredientsChange(ingredients);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  // Get suggestions based on current input
  const getCurrentSuggestions = () => {
    const currentIngredients = inputValue
      .split(',')
      .map(ingredient => ingredient.trim())
      .filter(ingredient => ingredient.length > 0);
    
    const lastIngredient = inputValue.split(',').pop()?.trim() || '';
    
    if (lastIngredient.length > 0) {
      return ingredientSuggestions
        .filter(ingredient =>
          ingredient.toLowerCase().includes(lastIngredient.toLowerCase()) &&
          !currentIngredients.some(current => 
            current.toLowerCase() === ingredient.toLowerCase()
          )
        )
        .slice(0, 5);
    }
    return [];
  };

  const suggestions = getCurrentSuggestions();

  const handleSuggestionClick = (suggestion: string) => {
    const ingredients = inputValue.split(',').map(ingredient => ingredient.trim());
    ingredients[ingredients.length - 1] = suggestion;
    const newValue = ingredients.join(', ') + ', ';
    setInputValue(newValue);
    
    const finalIngredients = newValue
      .split(',')
      .map(ingredient => ingredient.trim())
      .filter(ingredient => ingredient.length > 0);
    
    onIngredientsChange(finalIngredients);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Enter ingredients separated by commas (e.g., chicken, rice, tomatoes, onion)"
          className="w-full px-4 py-3 sm:py-3 text-base sm:text-sm bg-white/80 dark:bg-gray-800/80 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 backdrop-blur-sm transition-colors duration-200 touch-manipulation"
        />

        {suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border border-gray-300 dark:border-gray-600 rounded-lg shadow-xl z-10 max-h-48 overflow-y-auto">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full px-4 py-3 sm:py-2 text-left text-base sm:text-sm hover:bg-emerald-50 dark:hover:bg-emerald-900/20 active:bg-emerald-100 dark:active:bg-emerald-900/30 transition-colors duration-150 text-gray-900 dark:text-gray-100 first:rounded-t-lg last:rounded-b-lg touch-manipulation"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="text-sm sm:text-xs text-gray-500 dark:text-gray-400">
        💡 Tip: Type ingredients separated by commas. Suggestions will appear as you type.
      </div>
    </div>
  );
};