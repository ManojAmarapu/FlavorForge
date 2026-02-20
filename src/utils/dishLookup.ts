import { Recipe } from '../types/recipe';

// Database of popular dishes with their ingredients and instructions
const dishDatabase: Record<string, Omit<Recipe, 'id' | 'matchedIngredients'>> = {
  'spaghetti bolognese': {
    title: 'Spaghetti Bolognese',
    description: 'Classic Italian pasta with rich meat sauce',
    cookingTime: '45 minutes',
    servings: 4,
    difficulty: 'Medium',
    ingredients: ['spaghetti', 'ground beef', 'onion', 'garlic', 'carrots', 'celery', 'tomato sauce', 'red wine', 'olive oil', 'basil', 'oregano', 'parmesan cheese'],
    instructions: [
      'Heat olive oil in a large pan over medium heat',
      'Add diced onion, carrots, and celery. Cook until softened',
      'Add minced garlic and cook for 1 minute',
      'Add ground beef and cook until browned, breaking it up with a spoon',
      'Pour in red wine and let it reduce by half',
      'Add tomato sauce, basil, and oregano. Season with salt and pepper',
      'Simmer on low heat for 30 minutes, stirring occasionally',
      'Meanwhile, cook spaghetti according to package directions',
      'Drain pasta and serve with the bolognese sauce',
      'Top with freshly grated parmesan cheese'
    ],
    tags: ['Italian', 'Pasta', 'Meat', 'Classic']
  },
  'chicken curry': {
    title: 'Chicken Curry',
    description: 'Aromatic and flavorful chicken curry with spices',
    cookingTime: '40 minutes',
    servings: 4,
    difficulty: 'Medium',
    ingredients: ['chicken breast', 'onion', 'garlic', 'ginger', 'tomatoes', 'coconut milk', 'curry powder', 'turmeric', 'cumin', 'coriander', 'chili powder', 'oil', 'cilantro'],
    instructions: [
      'Cut chicken into bite-sized pieces and season with salt',
      'Heat oil in a large pan over medium-high heat',
      'Cook chicken pieces until browned on all sides, then remove',
      'In the same pan, sauté diced onion until golden',
      'Add minced garlic and ginger, cook for 1 minute',
      'Add curry powder, turmeric, cumin, and coriander. Cook for 30 seconds',
      'Add diced tomatoes and cook until they break down',
      'Pour in coconut milk and bring to a simmer',
      'Return chicken to the pan and simmer for 15-20 minutes',
      'Taste and adjust seasoning. Garnish with fresh cilantro',
      'Serve hot with rice or naan bread'
    ],
    tags: ['Indian', 'Spicy', 'Chicken', 'Curry']
  },
  'caesar salad': {
    title: 'Caesar Salad',
    description: 'Classic Caesar salad with crispy croutons and parmesan',
    cookingTime: '15 minutes',
    servings: 2,
    difficulty: 'Easy',
    ingredients: ['romaine lettuce', 'parmesan cheese', 'croutons', 'garlic', 'anchovies', 'lemon juice', 'olive oil', 'egg yolk', 'dijon mustard', 'black pepper'],
    instructions: [
      'Wash and dry romaine lettuce, then chop into bite-sized pieces',
      'Make dressing by whisking together minced garlic, mashed anchovies, lemon juice, and dijon mustard',
      'Slowly whisk in olive oil to create an emulsion',
      'Add egg yolk and whisk until smooth',
      'Season with black pepper',
      'Toss lettuce with dressing until well coated',
      'Add half the parmesan cheese and toss again',
      'Top with croutons and remaining parmesan',
      'Serve immediately'
    ],
    tags: ['Salad', 'Classic', 'Quick', 'Vegetarian']
  },
  'beef stir fry': {
    title: 'Beef Stir Fry',
    description: 'Quick and healthy beef stir fry with vegetables',
    cookingTime: '20 minutes',
    servings: 3,
    difficulty: 'Easy',
    ingredients: ['beef strips', 'bell peppers', 'broccoli', 'carrots', 'onion', 'garlic', 'ginger', 'soy sauce', 'oyster sauce', 'sesame oil', 'cornstarch', 'vegetable oil'],
    instructions: [
      'Slice beef into thin strips and marinate with soy sauce and cornstarch',
      'Cut all vegetables into uniform pieces',
      'Heat vegetable oil in a wok or large skillet over high heat',
      'Stir-fry beef strips until browned, then remove',
      'Add more oil if needed, then stir-fry garlic and ginger for 30 seconds',
      'Add harder vegetables (carrots, broccoli) first and stir-fry for 2 minutes',
      'Add bell peppers and onion, stir-fry for another 2 minutes',
      'Return beef to the wok',
      'Add soy sauce and oyster sauce, toss everything together',
      'Drizzle with sesame oil and serve immediately over rice'
    ],
    tags: ['Asian', 'Quick', 'Healthy', 'Beef']
  },
  'pancakes': {
    title: 'Fluffy Pancakes',
    description: 'Light and fluffy breakfast pancakes',
    cookingTime: '20 minutes',
    servings: 4,
    difficulty: 'Easy',
    ingredients: ['flour', 'sugar', 'baking powder', 'salt', 'milk', 'eggs', 'butter', 'vanilla extract'],
    instructions: [
      'In a large bowl, whisk together flour, sugar, baking powder, and salt',
      'In another bowl, beat eggs and add milk, melted butter, and vanilla',
      'Pour wet ingredients into dry ingredients and mix until just combined (lumps are okay)',
      'Let batter rest for 5 minutes',
      'Heat a griddle or large skillet over medium heat',
      'Pour 1/4 cup of batter for each pancake',
      'Cook until bubbles form on surface and edges look set',
      'Flip and cook until golden brown on the other side',
      'Serve hot with butter and maple syrup'
    ],
    tags: ['Breakfast', 'Sweet', 'Family-Friendly']
  }
};

export const lookupDish = (dishName: string): Recipe | null => {
  const normalizedName = dishName.toLowerCase().trim();
  
  // Direct match
  if (dishDatabase[normalizedName]) {
    return {
      id: `lookup-${Date.now()}`,
      ...dishDatabase[normalizedName],
      matchedIngredients: []
    };
  }
  
  // Partial match
  const partialMatch = Object.keys(dishDatabase).find(key => 
    key.includes(normalizedName) || normalizedName.includes(key)
  );
  
  if (partialMatch) {
    return {
      id: `lookup-${Date.now()}`,
      ...dishDatabase[partialMatch],
      matchedIngredients: []
    };
  }
  
  return null;
};

export const getDishSuggestions = (input: string): string[] => {
  if (input.length < 2) return [];
  
  const normalizedInput = input.toLowerCase();
  return Object.keys(dishDatabase)
    .filter(dish => dish.includes(normalizedInput))
    .map(dish => dishDatabase[dish].title)
    .slice(0, 5);
};