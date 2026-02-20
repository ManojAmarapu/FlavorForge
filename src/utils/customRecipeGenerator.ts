import { Recipe } from '../types/recipe';

// Generate a creative dish name based on ingredients
export const generateDishName = (ingredients: string[], variant: number = 0): string => {
  const mainIngredients = ingredients.slice(0, 3);
  const cookingMethods = [
    ['Sautéed', 'Roasted', 'Grilled'],
    ['Pan-fried', 'Braised', 'Steamed'],
    ['Baked', 'Stir-fried', 'Simmered']
  ];
  const dishTypes = [
    ['Delight', 'Medley', 'Fusion'],
    ['Supreme', 'Special', 'Creation'],
    ['Bowl', 'Skillet', 'Casserole']
  ];
  
  const methodGroup = cookingMethods[variant % cookingMethods.length];
  const typeGroup = dishTypes[variant % dishTypes.length];
  
  const randomMethod = methodGroup[Math.floor(Math.random() * methodGroup.length)];
  const randomType = typeGroup[Math.floor(Math.random() * typeGroup.length)];
  
  if (mainIngredients.length >= 2) {
    const primary = mainIngredients[0].charAt(0).toUpperCase() + mainIngredients[0].slice(1);
    const secondary = mainIngredients[1].charAt(0).toUpperCase() + mainIngredients[1].slice(1);
    return `${randomMethod} ${primary} & ${secondary} ${randomType}`;
  } else if (mainIngredients.length === 1) {
    const primary = mainIngredients[0].charAt(0).toUpperCase() + mainIngredients[0].slice(1);
    return `${randomMethod} ${primary} ${randomType}`;
  }
  
  return `Custom ${randomType}`;
};

// Generate cooking instructions based on ingredients
export const generateInstructions = (ingredients: string[], cookingStyle: 'quick' | 'traditional' | 'healthy' = 'traditional'): string[] => {
  const instructions: string[] = [];
  
  // Preparation step
  instructions.push('Gather all ingredients and prepare your workspace. Wash and clean all fresh ingredients thoroughly.');
  
  // Ingredient-specific preparation
  const hasVegetables = ingredients.some(ing => 
    ['onion', 'garlic', 'tomatoes', 'bell peppers', 'carrots', 'broccoli', 'mushrooms', 'spinach', 'lettuce'].includes(ing.toLowerCase())
  );
  
  const hasMeat = ingredients.some(ing => 
    ['chicken', 'beef', 'pork', 'fish', 'turkey'].includes(ing.toLowerCase())
  );
  
  const hasGrains = ingredients.some(ing => 
    ['rice', 'pasta', 'quinoa', 'bread', 'flour'].includes(ing.toLowerCase())
  );
  
  if (hasVegetables) {
    instructions.push('Dice onions, mince garlic, and chop all vegetables into uniform pieces for even cooking.');
  }
  
  if (hasMeat) {
    instructions.push('Season the meat with salt and pepper. Let it come to room temperature for about 10 minutes.');
  }
  
  // Cooking steps
  if (cookingStyle === 'quick') {
    instructions.push('Heat oil in a large pan or wok over high heat for quick cooking.');
  } else if (cookingStyle === 'healthy') {
    instructions.push('Use minimal oil and heat a non-stick pan over medium heat.');
  } else {
    instructions.push('Heat oil in a large pan or skillet over medium-high heat.');
  }
  
  if (hasMeat) {
    if (cookingStyle === 'quick') {
      instructions.push('Quickly sear the meat until browned and cooked through. Remove and set aside.');
    } else {
      instructions.push('Cook the meat first until browned on all sides and cooked through. Remove and set aside.');
    }
  }
  
  if (hasVegetables) {
    if (cookingStyle === 'healthy') {
      instructions.push('Steam or lightly sauté vegetables to retain maximum nutrients and color.');
    } else {
      instructions.push('In the same pan, sauté onions and garlic until fragrant, then add other vegetables in order of cooking time needed.');
    }
  }
  
  if (hasGrains && ingredients.includes('rice')) {
    if (cookingStyle === 'quick') {
      instructions.push('Add pre-cooked rice and toss with other ingredients for a quick meal.');
    } else {
      instructions.push('Add rice and stir to coat with the flavors. Add liquid (broth or water) and bring to a boil, then reduce heat and simmer covered.');
    }
  } else if (hasGrains && ingredients.includes('pasta')) {
    instructions.push('Cook pasta separately according to package directions. Drain and add to the pan with other ingredients.');
  }
  
  // Combining and finishing
  if (hasMeat) {
    instructions.push('Return the cooked meat to the pan and combine with all other ingredients.');
  }
  
  if (cookingStyle === 'healthy') {
    instructions.push('Season with herbs, spices, and minimal salt. Add a splash of lemon juice for brightness.');
  } else {
    instructions.push('Season with salt, pepper, and any herbs or spices. Taste and adjust seasoning as needed.');
  }
  
  if (cookingStyle === 'quick') {
    instructions.push('Toss everything together for 1-2 minutes until heated through.');
  } else {
    instructions.push('Cook for an additional 2-3 minutes to let flavors meld together.');
  }
  
  instructions.push('Remove from heat and let rest for 2 minutes before serving. Garnish as desired and enjoy!');
  
  return instructions;
};

// Generate a custom recipe from user ingredients
export const generateCustomRecipe = (ingredients: string[], variant: number = 0): Recipe => {
  const cookingStyles: ('quick' | 'traditional' | 'healthy')[] = ['traditional', 'quick', 'healthy'];
  const cookingStyle = cookingStyles[variant % cookingStyles.length];
  
  const dishName = generateDishName(ingredients, variant);
  const instructions = generateInstructions(ingredients, cookingStyle);
  
  // Estimate cooking time based on ingredients
  const hasMeat = ingredients.some(ing => 
    ['chicken', 'beef', 'pork', 'fish', 'turkey'].includes(ing.toLowerCase())
  );
  const hasGrains = ingredients.some(ing => 
    ['rice', 'pasta', 'quinoa'].includes(ing.toLowerCase())
  );
  
  let cookingTime = '15 minutes';
  if (cookingStyle === 'quick') {
    cookingTime = hasMeat ? '20 minutes' : '15 minutes';
  } else if (cookingStyle === 'healthy') {
    cookingTime = hasMeat && hasGrains ? '30 minutes' : hasMeat ? '25 minutes' : '20 minutes';
  } else {
    if (hasMeat && hasGrains) {
      cookingTime = '35 minutes';
    } else if (hasMeat || hasGrains) {
      cookingTime = '25 minutes';
    }
  }
  
  // Determine difficulty
  let difficulty: 'Easy' | 'Medium' | 'Hard' = 'Easy';
  if (cookingStyle === 'quick') {
    difficulty = 'Easy';
  } else if (ingredients.length > 8) {
    difficulty = 'Hard';
  } else if (ingredients.length > 5 || hasMeat) {
    difficulty = 'Medium';
  }
  
  // Generate tags based on ingredients
  const tags: string[] = ['Custom Recipe', cookingStyle.charAt(0).toUpperCase() + cookingStyle.slice(1)];
  if (ingredients.some(ing => ['chicken', 'beef', 'pork', 'fish'].includes(ing.toLowerCase()))) {
    tags.push('Protein');
  }
  if (ingredients.some(ing => ['broccoli', 'spinach', 'carrots', 'bell peppers'].includes(ing.toLowerCase()))) {
    tags.push('Vegetables');
    if (cookingStyle === 'healthy') tags.push('Nutritious');
  }
  if (ingredients.some(ing => ['rice', 'pasta', 'quinoa'].includes(ing.toLowerCase()))) {
    tags.push('Comfort Food');
  }
  if (cookingStyle === 'quick') {
    tags.push('Quick Meal');
  }
  
  return {
    id: `custom-${Date.now()}-${variant}`,
    title: dishName,
    description: `A delicious ${cookingStyle} recipe made with ${ingredients.slice(0, 3).join(', ')}${ingredients.length > 3 ? ' and more' : ''}. Perfect for ${cookingStyle === 'quick' ? 'busy weeknights' : cookingStyle === 'healthy' ? 'nutritious meals' : 'traditional cooking'}.`,
    cookingTime,
    servings: Math.max(2, Math.min(6, Math.floor(ingredients.length / 2))),
    difficulty,
    ingredients,
    instructions,
    tags,
    matchedIngredients: ingredients,
    isCustom: true
  };
};

// Generate multiple custom recipes from user ingredients
export const generateMultipleCustomRecipes = (ingredients: string[]): Recipe[] => {
  const recipes: Recipe[] = [];
  
  // Generate 3 different variations
  for (let i = 0; i < 3; i++) {
    recipes.push(generateCustomRecipe(ingredients, i));
  }
  
  return recipes;
};