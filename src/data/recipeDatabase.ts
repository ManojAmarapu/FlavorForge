import { Recipe } from '../types/recipe';

export const recipeDatabase: Recipe[] = [
  {
    id: '1',
    title: 'Classic Spaghetti Carbonara',
    description: 'A creamy Italian pasta dish with eggs, cheese, and pancetta',
    cookingTime: '20 minutes',
    servings: 4,
    difficulty: 'Medium',
    ingredients: ['spaghetti', 'eggs', 'parmesan cheese', 'pancetta', 'black pepper', 'salt'],
    instructions: [
      'Bring a large pot of salted water to boil and cook spaghetti according to package directions',
      'Meanwhile, cook pancetta in a large skillet over medium heat until crispy',
      'In a bowl, whisk together eggs, grated parmesan cheese, and black pepper',
      'Drain pasta, reserving 1 cup of pasta water',
      'Add hot pasta to the skillet with pancetta',
      'Remove from heat and quickly toss with egg mixture, adding pasta water as needed',
      'Serve immediately with extra parmesan and black pepper'
    ],
    tags: ['Italian', 'Pasta', 'Quick', 'Comfort Food'],
    matchedIngredients: []
  },
  {
    id: '2',
    title: 'Vegetable Stir Fry',
    description: 'A healthy and colorful mix of fresh vegetables in savory sauce',
    cookingTime: '15 minutes',
    servings: 3,
    difficulty: 'Easy',
    ingredients: ['broccoli', 'carrots', 'bell peppers', 'onion', 'garlic', 'soy sauce', 'ginger', 'oil'],
    instructions: [
      'Heat oil in a large wok or skillet over high heat',
      'Add minced garlic and ginger, stir-fry for 30 seconds',
      'Add onion and cook for 2 minutes until translucent',
      'Add carrots and broccoli, stir-fry for 3-4 minutes',
      'Add bell peppers and cook for another 2 minutes',
      'Pour in soy sauce and toss everything together',
      'Cook for 1 more minute and serve hot over rice'
    ],
    tags: ['Vegetarian', 'Healthy', 'Asian', 'Quick'],
    matchedIngredients: []
  },
  {
    id: '3',
    title: 'Chicken Caesar Salad',
    description: 'Fresh romaine lettuce with grilled chicken and classic Caesar dressing',
    cookingTime: '25 minutes',
    servings: 2,
    difficulty: 'Easy',
    ingredients: ['chicken breast', 'romaine lettuce', 'parmesan cheese', 'croutons', 'garlic', 'lemon', 'olive oil', 'anchovies'],
    instructions: [
      'Season chicken breast with salt and pepper',
      'Grill chicken over medium-high heat for 6-7 minutes per side',
      'Let chicken rest for 5 minutes, then slice into strips',
      'Wash and chop romaine lettuce into bite-sized pieces',
      'Make dressing by whisking together minced garlic, lemon juice, olive oil, and mashed anchovies',
      'Toss lettuce with dressing and half the parmesan cheese',
      'Top with sliced chicken, croutons, and remaining parmesan'
    ],
    tags: ['Salad', 'Protein', 'Classic', 'Healthy'],
    matchedIngredients: []
  },
  {
    id: '4',
    title: 'Beef Tacos',
    description: 'Seasoned ground beef in soft tortillas with fresh toppings',
    cookingTime: '30 minutes',
    servings: 4,
    difficulty: 'Easy',
    ingredients: ['ground beef', 'tortillas', 'onion', 'garlic', 'tomatoes', 'lettuce', 'cheese', 'cumin', 'chili powder'],
    instructions: [
      'Heat a large skillet over medium-high heat',
      'Add ground beef and cook, breaking it up with a spoon',
      'Add diced onion and minced garlic, cook until fragrant',
      'Season with cumin, chili powder, salt, and pepper',
      'Cook until beef is browned and onion is soft',
      'Warm tortillas in a dry skillet or microwave',
      'Fill tortillas with beef mixture and top with lettuce, tomatoes, and cheese'
    ],
    tags: ['Mexican', 'Meat', 'Family-Friendly', 'Quick'],
    matchedIngredients: []
  },
  {
    id: '5',
    title: 'Mushroom Risotto',
    description: 'Creamy Italian rice dish with earthy mushrooms and herbs',
    cookingTime: '45 minutes',
    servings: 4,
    difficulty: 'Hard',
    ingredients: ['arborio rice', 'mushrooms', 'onion', 'garlic', 'white wine', 'vegetable broth', 'parmesan cheese', 'butter'],
    instructions: [
      'Heat vegetable broth in a separate pot and keep warm',
      'Sauté sliced mushrooms in butter until golden, set aside',
      'In the same pan, cook diced onion and garlic until translucent',
      'Add arborio rice and stir for 2 minutes until lightly toasted',
      'Pour in white wine and stir until absorbed',
      'Add warm broth one ladle at a time, stirring constantly',
      'Continue adding broth and stirring for 18-20 minutes until rice is creamy',
      'Stir in cooked mushrooms, parmesan cheese, and butter before serving'
    ],
    tags: ['Italian', 'Vegetarian', 'Comfort Food', 'Elegant'],
    matchedIngredients: []
  },
  {
    id: '6',
    title: 'Pancakes',
    description: 'Fluffy breakfast pancakes perfect for weekend mornings',
    cookingTime: '20 minutes',
    servings: 4,
    difficulty: 'Easy',
    ingredients: ['flour', 'eggs', 'milk', 'sugar', 'baking powder', 'salt', 'butter', 'vanilla'],
    instructions: [
      'In a large bowl, whisk together flour, sugar, baking powder, and salt',
      'In another bowl, beat eggs and add milk, melted butter, and vanilla',
      'Pour wet ingredients into dry ingredients and mix until just combined',
      'Heat a griddle or large skillet over medium heat',
      'Pour batter onto griddle to form pancakes',
      'Cook until bubbles form on surface, then flip and cook other side',
      'Serve hot with butter and syrup'
    ],
    tags: ['Breakfast', 'Sweet', 'Family-Friendly', 'Weekend'],
    matchedIngredients: []
  }
];

export const ingredientSuggestions = [
  'chicken breast', 'ground beef', 'eggs', 'milk', 'cheese', 'butter', 'flour', 'rice',
  'pasta', 'spaghetti', 'onion', 'garlic', 'tomatoes', 'bell peppers', 'broccoli',
  'carrots', 'mushrooms', 'lettuce', 'spinach', 'potatoes', 'olive oil', 'salt',
  'black pepper', 'basil', 'oregano', 'thyme', 'lemon', 'lime', 'soy sauce',
  'parmesan cheese', 'mozzarella', 'cheddar cheese', 'bread', 'tortillas'
];