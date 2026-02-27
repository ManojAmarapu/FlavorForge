import { Recipe } from '../types/recipe';

export const RECIPE_POOL: Omit<Recipe, 'id' | 'createdAt' | 'matchedIngredients'>[] = [
    {
        title: "Classic Spaghetti Carbonara",
        description: "A traditional Roman pasta dish made with eggs, cheese, pancetta, and black pepper.",
        ingredients: ["spaghetti", "eggs", "pecorino romano", "pancetta", "black pepper", "salt"],
        instructions: [
            "Boil water in a large pot and cook spaghetti until al dente.",
            "While pasta cooks, crisp the pancetta in a skillet over medium heat.",
            "Whisk eggs and grated pecorino cheese together in a small bowl.",
            "Drain pasta, reserving 1/2 cup of pasta water.",
            "Combine pasta and pancetta in the skillet (off heat).",
            "Quickly stir in the egg mixture, adding pasta water to create a creamy sauce.",
            "Serve immediately with extra black pepper and cheese."
        ],
        cookingTime: 20,
        difficulty: "Medium",
        tags: ["Italian", "Pasta", "Dinner", "Quick"]
    },
    {
        title: "Garlic Butter Steak Bites",
        description: "Tender, juicy sirloin steak pieces seared and coated in a rich garlic herb butter.",
        ingredients: ["sirloin steak", "butter", "garlic", "thyme", "olive oil", "salt", "black pepper"],
        instructions: [
            "Cut the steak into bite-sized 1-inch cubes and season well with salt and pepper.",
            "Heat olive oil in a large skillet over high heat until smoking hot.",
            "Add steak bites in a single layer and sear for 2 minutes undisturbed.",
            "Flip the bites and cook for 1 more minute.",
            "Reduce heat to medium, add butter, minced garlic, and fresh thyme.",
            "Toss the steak in the melting garlic butter for 1 minute.",
            "Rest for 2 minutes before serving."
        ],
        cookingTime: 15,
        difficulty: "Easy",
        tags: ["Beef", "Keto", "High Protein", "Dinner"]
    },
    {
        title: "Vegetarian Lentil Curry",
        description: "A warming, spiced red lentil curry simmered in coconut milk.",
        ingredients: ["red lentils", "coconut milk", "onion", "garlic", "ginger", "curry powder", "spinach", "vegetable broth", "tomatoes"],
        instructions: [
            "Dice the onion, garlic, and ginger.",
            "Saute the onion in a large pot until soft, about 5 minutes.",
            "Add garlic, ginger, and curry powder. Cook for 1 minute until fragrant.",
            "Stir in the diced tomatoes, red lentils, and vegetable broth.",
            "Bring to a boil, then reduce heat and simmer for 15 minutes.",
            "Pour in the coconut milk and simmer for another 5 minutes until lentils are tender.",
            "Stir in fresh spinach until wilted, then serve over rice."
        ],
        cookingTime: 30,
        difficulty: "Easy",
        tags: ["Vegan", "Curry", "Healthy", "Comfort Food"]
    },
    {
        title: "Honey Soy Glazed Salmon",
        description: "Flaky baked salmon fillets coated in a sweet and savory honey soy glaze.",
        ingredients: ["salmon fillets", "soy sauce", "honey", "garlic", "ginger", "sesame oil", "green onions", "sesame seeds"],
        instructions: [
            "Preheat oven to 400°F (200°C) and line a baking sheet with parchment paper.",
            "Whisk soy sauce, honey, minced garlic, grated ginger, and sesame oil in a bowl.",
            "Place salmon on the baking sheet and pour the glaze over the fillets.",
            "Bake for 12-15 minutes until salmon flakes easily with a fork.",
            "Garnish with sliced green onions and sesame seeds before serving."
        ],
        cookingTime: 20,
        difficulty: "Easy",
        tags: ["Seafood", "Healthy", "Asian-Inspired", "Dinner"]
    },
    {
        title: "Crispy Parmesan Chicken",
        description: "Juicy chicken breasts with a crispy, golden parmesan crust.",
        ingredients: ["chicken breasts", "parmesan cheese", "breadcrumbs", "eggs", "flour", "garlic powder", "olive oil", "salt", "black pepper"],
        instructions: [
            "Pound chicken breasts to an even thickness.",
            "Set up a breading station: flour in one bowl, beaten eggs in the second, and breadcrumbs mixed with parmesan in the third.",
            "Season chicken with salt, pepper, and garlic powder.",
            "Dredge chicken in flour, dip in eggs, then coat thoroughly in the parmesan mixture.",
            "Heat olive oil in a skillet over medium-high heat.",
            "Pan-fry the chicken for 4-5 minutes per side until golden and cooked through."
        ],
        cookingTime: 25,
        difficulty: "Medium",
        tags: ["Chicken", "Dinner", "Italian-American"]
    },
    {
        title: "Caprese Salad",
        description: "A fresh, simple Italian salad with ripe tomatoes, fresh mozzarella, and aromatic basil.",
        ingredients: ["tomatoes", "fresh mozzarella", "fresh basil", "balsamic glaze", "olive oil", "salt", "black pepper"],
        instructions: [
            "Slice the tomatoes and mozzarella into 1/4-inch thick rounds.",
            "Arrange them on a platter, alternating between tomato and mozzarella.",
            "Tuck fresh basil leaves between the slices.",
            "Drizzle generously with extra virgin olive oil and balsamic glaze.",
            "Sprinkle with flaky sea salt and freshly cracked black pepper.",
            "Serve immediately at room temperature."
        ],
        cookingTime: 10,
        difficulty: "Easy",
        tags: ["Salad", "Vegetarian", "Italian", "Appetizer"]
    },
    {
        title: "Mushroom Risotto",
        description: "Creamy arborio rice slowly cooked with earthy mushrooms, white wine, and parmesan.",
        ingredients: ["arborio rice", "mushrooms", "chicken broth", "white wine", "onion", "garlic", "butter", "parmesan cheese", "olive oil"],
        instructions: [
            "Warm the chicken broth in a saucepan.",
            "Saute sliced mushrooms in olive oil until browned, then remove and set aside.",
            "In the same pan, melt butter and saute diced onions until translucent.",
            "Add minced garlic and arborio rice, toasting for 2 minutes.",
            "Pour in the white wine and stir until absorbed.",
            "Add warm broth one ladle at a time, stirring constantly until absorbed before adding more.",
            "Once rice is creamy and al dente (about 20 mins), stir in the mushrooms, parmesan, and a knob of butter."
        ],
        cookingTime: 40,
        difficulty: "Hard",
        tags: ["Italian", "Vegetarian", "Dinner"]
    },
    {
        title: "Spicy Beef Taco Bowls",
        description: "Deconstructed tacos featuring seasoned ground beef, rice, beans, and fresh toppings.",
        ingredients: ["ground beef", "white rice", "black beans", "corn", "taco seasoning", "salsa", "cheddar cheese", "sour cream", "cilantro"],
        instructions: [
            "Cook rice according to package instructions.",
            "Brown the ground beef in a skillet over medium heat. Drain excess fat.",
            "Add taco seasoning and a splash of water to the beef, simmering for 3 minutes.",
            "Warm the black beans and corn in a small pot.",
            "Assemble bowls with a base of rice, topped with the spiced beef, beans, and corn.",
            "Garnish with salsa, shredded cheese, sour cream, and fresh cilantro."
        ],
        cookingTime: 20,
        difficulty: "Easy",
        tags: ["Mexican", "Meal Prep", "Beef"]
    },
    {
        title: "Simple Avocado Toast",
        description: "Artisan sourdough topped with creamy mashed avocado, chili flakes, and a squeeze of lemon.",
        ingredients: ["sourdough bread", "avocado", "lemon juice", "olive oil", "red pepper flakes", "salt"],
        instructions: [
            "Toast the sourdough bread slices until golden crisp.",
            "Halve the avocado, remove the pit, and scoop the flesh into a bowl.",
            "Mash the avocado with a fork. Mix in lemon juice and a pinch of salt.",
            "Spread the mashed avocado thickly over the toast.",
            "Drizzle lightly with olive oil and sprinkle with red pepper flakes."
        ],
        cookingTime: 5,
        difficulty: "Easy",
        tags: ["Breakfast", "Vegan", "Quick"]
    },
    {
        title: "Creamy Tomato Soup",
        description: "A rich, vibrant tomato soup blending roasted tomatoes, garlic, and fresh basil.",
        ingredients: ["plum tomatoes", "onion", "garlic", "vegetable broth", "heavy cream", "fresh basil", "olive oil", "salt", "black pepper"],
        instructions: [
            "Preheat oven to 400°F (200°C).",
            "Halve tomatoes and place them on a baking sheet with quartered onions and peeled garlic cloves.",
            "Drizzle with olive oil, salt, and pepper. Roast for 40 minutes.",
            "Transfer roasted vegetables to a large pot and add vegetable broth.",
            "Bring to a simmer, then use an immersion blender to puree until smooth.",
            "Stir in heavy cream and chopped fresh basil. Heat gently for 2 minutes before serving."
        ],
        cookingTime: 50,
        difficulty: "Medium",
        tags: ["Soup", "Vegetarian", "Comfort Food"]
    },
    {
        title: "Shrimp Scampi",
        description: "Succulent shrimp tossed in a garlic, butter, and lemon white wine sauce over linguine.",
        ingredients: ["shrimp", "linguine", "garlic", "butter", "olive oil", "white wine", "lemon juice", "red pepper flakes", "parsley"],
        instructions: [
            "Boil salted water and cook linguine until al dente.",
            "Heat olive oil and half the butter in a large skillet over medium heat.",
            "Add minced garlic and red pepper flakes; cook for 1 minute.",
            "Add the shrimp and cook until pink, about 2 minutes per side. Remove shrimp.",
            "Pour white wine and lemon juice into the skillet, scraping up bits. Simmer for 2 minutes.",
            "Stir in the remaining butter, return shrimp to the pan, and toss with the cooked pasta.",
            "Garnish heavily with chopped parsley."
        ],
        cookingTime: 25,
        difficulty: "Medium",
        tags: ["Seafood", "Italian", "Pasta"]
    },
    {
        title: "Classic Pancakes",
        description: "Fluffy, golden buttermilk pancakes perfect for a weekend breakfast.",
        ingredients: ["flour", "sugar", "baking powder", "baking soda", "eggs", "buttermilk", "butter", "vanilla extract", "maple syrup"],
        instructions: [
            "Whisk flour, sugar, baking powder, and baking soda in a large bowl.",
            "In a separate bowl, whisk eggs, buttermilk, melted butter, and vanilla.",
            "Pour the wet ingredients into the dry and gently fold until just combined (lumps are okay).",
            "Heat a lightly oiled griddle or pan over medium heat.",
            "Pour 1/4 cup of batter per pancake onto the griddle.",
            "Flip when bubbles form on the surface (about 2-3 minutes). Cook flipped side until golden.",
            "Serve warm with butter and maple syrup."
        ],
        cookingTime: 20,
        difficulty: "Easy",
        tags: ["Breakfast", "Sweet", "Classic"]
    },
    {
        title: "Chicken Tikka Masala",
        description: "Grilled marinated chicken chunks enveloped in a spiced, creamy tomato curry sauce.",
        ingredients: ["chicken thighs", "yogurt", "garam masala", "turmeric", "cumin", "tomato puree", "heavy cream", "onion", "garlic", "ginger", "cilantro"],
        instructions: [
            "Marinate chicken in yogurt, garlic, ginger, turmeric, and garam masala for at least 1 hour.",
            "Heat a skillet over high heat and char the chicken pieces until cooked through. Set aside.",
            "In the same pot, saute diced onions until browned. Add garlic, ginger, and cumin.",
            "Pour in tomato puree and simmer for 15 minutes to reduce.",
            "Stir in the heavy cream and the cooked chicken pieces.",
            "Simmer for 5 minutes. Garnish with fresh cilantro."
        ],
        cookingTime: 45,
        difficulty: "Medium",
        tags: ["Indian", "Chicken", "Curry"]
    },
    {
        title: "Roasted Vegetable Quinoa Salad",
        description: "A hearty salad of fluffy quinoa and caramelized roasted seasonal vegetables.",
        ingredients: ["quinoa", "sweet potato", "zucchini", "red bell pepper", "red onion", "olive oil", "lemon juice", "feta cheese", "salt", "black pepper"],
        instructions: [
            "Preheat oven to 425°F (220°C).",
            "Chop sweet potato, zucchini, bell pepper, and red onion into uniform pieces.",
            "Toss vegetables with olive oil, salt, and pepper. Roast on a baking sheet for 25 minutes.",
            "Meanwhile, rinse quinoa and simmer with 2 parts water until tender (about 15 mins).",
            "In a large bowl, toss the warm quinoa with the roasted vegetables.",
            "Drizzle with fresh lemon juice and fold in crumbled feta cheese."
        ],
        cookingTime: 35,
        difficulty: "Easy",
        tags: ["Healthy", "Vegetarian", "Salad"]
    },
    {
        title: "Classic Cheeseburger",
        description: "A juicy, perfectly seared beef patty topped with melted cheese, fresh lettuce, and tomato.",
        ingredients: ["ground beef", "hamburger buns", "cheddar cheese", "lettuce", "tomato", "onion", "pickles", "ketchup", "mustard", "salt", "black pepper"],
        instructions: [
            "Form the ground beef into loose, 3/4-inch thick patties. Make a thumbprint in the center of each.",
            "Season generously with salt and pepper right before cooking.",
            "Heat a cast-iron skillet over medium-high heat. Sear patties for 3-4 minutes per side.",
            "During the last minute of cooking, place a slice of cheese on each patty to melt.",
            "Toast the buns lightly in the skillet.",
            "Assemble: bottom bun, ketchup/mustard, lettuce, tomato, patty, onion, pickles, top bun."
        ],
        cookingTime: 15,
        difficulty: "Medium",
        tags: ["Beef", "American", "Dinner"]
    },
    {
        title: "Pesto Pasta Salad",
        description: "A refreshing cold pasta salad loaded with cherry tomatoes, mozzarella pearls, and basil pesto.",
        ingredients: ["fusilli pasta", "basil pesto", "cherry tomatoes", "mozzarella pearls", "black olives", "red onion", "parmesan cheese", "olive oil"],
        instructions: [
            "Boil salted water and cook fusilli until al dente. Drain and rinse under cold water.",
            "Halve the cherry tomatoes and slice the black olives and red onion.",
            "In a large bowl, combine the cold pasta, tomatoes, mozzarella pearls, olives, and onion.",
            "Add the basil pesto and a drizzle of olive oil. Toss until everything is evenly coated.",
            "Top with grated parmesan cheese. Chill in the fridge for 30 minutes before serving."
        ],
        cookingTime: 15,
        difficulty: "Easy",
        tags: ["Pasta", "Vegetarian", "Lunch"]
    },
    {
        title: "Teriyaki Chicken Bowl",
        description: "Sweet and sticky glazed teriyaki chicken served over steamed rice with broccoli.",
        ingredients: ["chicken thighs", "soy sauce", "brown sugar", "mirin", "garlic", "ginger", "broccoli", "white rice", "sesame seeds"],
        instructions: [
            "Cut chicken thighs into bite-sized pieces.",
            "In a bowl, mix soy sauce, brown sugar, mirin, minced garlic, and grated ginger for the sauce.",
            "Heat a skillet over medium-high heat and brown the chicken pieces (about 5-6 minutes).",
            "Pour the teriyaki sauce over the chicken. Simmer until the sauce thickens and glazes the meat.",
            "Simultaneously, steam the broccoli florets until tender-crisp.",
            "Serve the glazed chicken and steamed broccoli over a bed of white rice, garnished with sesame seeds."
        ],
        cookingTime: 25,
        difficulty: "Medium",
        tags: ["Asian", "Chicken", "Dinner"]
    },
    {
        title: "Vegetable Stir Fry",
        description: "A quick, vibrant medley of fresh vegetables tossed in a savory garlic soy sauce.",
        ingredients: ["broccoli", "bell peppers", "carrots", "snow peas", "garlic", "ginger", "soy sauce", "sesame oil", "cornstarch"],
        instructions: [
            "Slice all vegetables thinly for quick, even cooking.",
            "Whisk soy sauce, sesame oil, a splash of water, and cornstarch in a small bowl.",
            "Heat oil in a wok or large skillet over high heat.",
            "Stir-fry the carrots and broccoli for 3 minutes.",
            "Add bell peppers and snow peas, cooking for another 2 minutes.",
            "Add minced garlic and ginger, tossing for 30 seconds until fragrant.",
            "Pour in the sauce mixture and toss until the vegetables are glazed and sauce is thick."
        ],
        cookingTime: 15,
        difficulty: "Easy",
        tags: ["Vegan", "Quick", "Healthy"]
    },
    {
        title: "Beef Stroganoff",
        description: "Tender strips of beef and mushrooms in a rich, tangy sour cream gravy over egg noodles.",
        ingredients: ["beef sirloin", "egg noodles", "mushrooms", "onion", "garlic", "beef broth", "sour cream", "flour", "butter", "dijon mustard"],
        instructions: [
            "Cook egg noodles according to package instructions.",
            "Slice beef into thin strips, season with salt and pepper, and toss in flour.",
            "Sear beef quickly in a hot skillet with butter. Remove and set aside.",
            "In the same pan, saute onions and mushrooms until browned. Add garlic.",
            "Pour in beef broth, scraping up brown bits. Simmer for 5 minutes.",
            "Stir in dijon mustard and return the beef to the pan.",
            "Remove from heat and stir in sour cream. Serve immediately over egg noodles."
        ],
        cookingTime: 30,
        difficulty: "Medium",
        tags: ["Beef", "Comfort Food", "Dinner"]
    },
    {
        title: "French Toast",
        description: "Thick slices of brioche soaked in an vanilla egg custard and pan-fried in butter.",
        ingredients: ["brioche bread", "eggs", "milk", "vanilla extract", "cinnamon", "butter", "maple syrup", "powdered sugar"],
        instructions: [
            "Whisk eggs, milk, vanilla extract, and cinnamon in a shallow dish.",
            "Heat a large skillet or griddle over medium heat and melt a pat of butter.",
            "Dip each slice of brioche into the egg mixture, coating both sides (do not over-soak).",
            "Place on the hot skillet and cook for 2-3 minutes per side until deeply golden brown.",
            "Dust with powdered sugar and serve immediately with warm maple syrup."
        ],
        cookingTime: 15,
        difficulty: "Easy",
        tags: ["Breakfast", "Sweet", "Classic"]
    },
    {
        title: "Greek Gyro Wraps",
        description: "Warm pita bread stuffed with seasoned meat, crisp veggies, and cool fresh tzatziki.",
        ingredients: ["pita bread", "lamb or chicken slices", "tzatziki sauce", "tomatoes", "red onion", "cucumber", "feta cheese", "lettuce"],
        instructions: [
            "Warm the pita bread in a pan or oven.",
            "Pan-fry the seasoned meat slices until hot and slightly crispy at the edges.",
            "Slice tomatoes, red onion, and cucumber thinly.",
            "Spread a generous dollop of tzatziki sauce down the center of a warm pita.",
            "Layer the meat, lettuce, tomatoes, cucumbers, and red onion.",
            "Top with crumbled feta cheese and fold the pita like a taco to serve."
        ],
        cookingTime: 15,
        difficulty: "Easy",
        tags: ["Greek", "Lunch", "Quick"]
    },
    {
        title: "Lemon Herb Cod",
        description: "Flaky, delicate white fish baked in a bright lemon, garlic, and fresh herb butter.",
        ingredients: ["cod fillets", "lemon", "butter", "garlic", "parsley", "dill", "salt", "black pepper"],
        instructions: [
            "Preheat oven to 400°F (200°C) and lightly grease a baking dish.",
            "Place cod fillets in the dish and season with salt and pepper.",
            "Melt butter and mix with minced garlic, chopped parsley, fresh dill, and lemon juice.",
            "Pour the herb butter mixture evenly over the cod.",
            "Bake for 10-12 minutes, or until the fish flakes easily with a fork.",
            "Serve with extra lemon wedges."
        ],
        cookingTime: 15,
        difficulty: "Easy",
        tags: ["Seafood", "Healthy", "Dinner"]
    },
    {
        title: "Pulled Pork Sandwiches",
        description: "Slow-cooked, melt-in-your-mouth pork shoulder drenched in smoky BBQ sauce.",
        ingredients: ["pork shoulder", "bbq sauce", "onion", "garlic powder", "paprika", "brown sugar", "apple cider vinegar", "hamburger buns", "coleslaw"],
        instructions: [
            "Rub the pork shoulder with brown sugar, paprika, garlic powder, salt, and pepper.",
            "Place a sliced onion at the bottom of a slow cooker, then add the seasoned pork.",
            "Pour in apple cider vinegar and cook on low for 8 hours (or high for 4-5 hours).",
            "Remove the pork and shred it using two forks. Discard excess fat.",
            "Return the shredded meat to the pot, stir in the BBQ sauce, and heat through.",
            "Serve piled high on buns, topped with fresh coleslaw."
        ],
        cookingTime: 480,
        difficulty: "Hard",
        tags: ["Pork", "Slow Cooker", "American"]
    },
    {
        title: "Margherita Pizza",
        description: "A classic Neapolitan-style pizza with a thin crust, San Marzano tomatoes, and fresh mozzarella.",
        ingredients: ["pizza dough", "canned crushed tomatoes", "fresh mozzarella", "fresh basil", "olive oil", "salt"],
        instructions: [
            "Preheat your oven to its highest setting (500°F / 260°C). Place a pizza stone inside if you have one.",
            "Stretch the pizza dough into a thin 12-inch circle on a piece of parchment paper.",
            "Season the crushed tomatoes with a pinch of salt and spread a thin layer over the dough.",
            "Tear the fresh mozzarella into pieces and distribute evenly.",
            "Bake for 8-10 minutes until the crust is blistered and cheese is bubbling.",
            "Remove from oven, top with fresh basil leaves, and drizzle with olive oil."
        ],
        cookingTime: 25,
        difficulty: "Medium",
        tags: ["Pizza", "Italian", "Vegetarian"]
    },
    {
        title: "Macaroni and Cheese",
        description: "A rich, baked casserole of elbow pasta enveloped in a creamy triple-cheese sauce.",
        ingredients: ["elbow macaroni", "butter", "flour", "milk", "cheddar cheese", "gruyere cheese", "parmesan cheese", "breadcrumbs"],
        instructions: [
            "Boil macaroni in salted water until just under al dente. Drain.",
            "In a large pot, melt butter and whisk in flour to create a roux. Cook for 1 minute.",
            "Gradually whisk in the milk over medium heat until smooth and thickened.",
            "Remove from heat and stir in the grated cheddar and gruyere until melted.",
            "Fold the cooked macaroni into the cheese sauce.",
            "Transfer to a baking dish, top with breadcrumbs and parmesan, and bake at 350°F (175°C) for 20 minutes."
        ],
        cookingTime: 45,
        difficulty: "Medium",
        tags: ["Comfort Food", "Vegetarian", "Dinner"]
    },
    {
        title: "Bacon and Egg Breakfast Sandwich",
        description: "A hearty loaded breakfast sandwich with crispy bacon, a fried egg, and melted cheddar.",
        ingredients: ["english muffin", "eggs", "bacon", "cheddar cheese", "butter", "salt", "black pepper"],
        instructions: [
            "Cook the bacon in a skillet over medium heat until crispy. Set aside on paper towels.",
            "Toast the English muffin slices and spread lightly with butter.",
            "In the bacon fat (or wiping the pan and using butter), fry the egg to your preferred doneness.",
            "Place a slice of cheddar cheese on the egg during the last minute to melt.",
            "Assemble the sandwich: muffin bottom, egg with cheese, crispy bacon, muffin top."
        ],
        cookingTime: 15,
        difficulty: "Easy",
        tags: ["Breakfast", "Quick", "Pork"]
    },
    {
        title: "Vegetable Minestrone Soup",
        description: "A hearty, rustic Italian soup full of seasonal vegetables, beans, and small pasta.",
        ingredients: ["ditalini pasta", "cannellini beans", "diced tomatoes", "vegetable broth", "carrots", "celery", "onion", "garlic", "zucchini", "parmesan cheese"],
        instructions: [
            "Dice the onion, carrots, and celery. Saute in olive oil in a large pot for 7 minutes.",
            "Add minced garlic and cook for 1 minute.",
            "Pour in the diced tomatoes, vegetable broth, and rinsed cannellini beans. Simmer for 15 minutes.",
            "Add diced zucchini and ditalini pasta. Simmer for another 10 minutes until pasta is tender.",
            "Season with salt, pepper, and Italian herbs.",
            "Serve hot, garnished with grated parmesan cheese."
        ],
        cookingTime: 40,
        difficulty: "Easy",
        tags: ["Soup", "Italian", "Vegetarian", "Healthy"]
    },
    {
        title: "Crispy Pork Belly",
        description: "Oven-roasted pork belly with exceptionally crispy crackling and tender meat.",
        ingredients: ["pork belly", "coarse salt", "chinese five spice", "rice vinegar", "soy sauce", "sugar"],
        instructions: [
            "Score the pork belly skin with a sharp knife, being careful not to cut into the meat.",
            "Rub the meat side (not the skin) with five spice, soy sauce, and sugar.",
            "Dry the skin completely with paper towels, rub with rice vinegar, and coat generously with coarse salt.",
            "Refrigerate uncovered overnight to dry out the skin.",
            "Preheat oven to 400°F (200°C) and roast for 45 minutes.",
            "Remove the salt crust from the skin, turn the heat to 450°F (230°C), and roast for 20 more minutes to puff the crackling."
        ],
        cookingTime: 75,
        difficulty: "Hard",
        tags: ["Pork", "Asian", "Dinner"]
    },
    {
        title: "Oven Baked Sweet Potato Fries",
        description: "Perfectly seasoned, crispy-edged sweet potato wedges baked rather than fried.",
        ingredients: ["sweet potatoes", "olive oil", "cornstarch", "garlic powder", "paprika", "salt", "black pepper"],
        instructions: [
            "Preheat oven to 425°F (220°C).",
            "Peel sweet potatoes and cut into uniform 1/4-inch thick matchsticks.",
            "Soak in cold water for 30 minutes, then drain and dry completely with paper towels.",
            "Toss the dry fries in a large bowl with cornstarch, tapping off the excess.",
            "Drizzle with olive oil and toss with garlic powder, paprika, salt, and pepper.",
            "Spread evenly on a baking sheet lined with parchment paper without overcrowding.",
            "Bake for 25-30 minutes, flipping halfway, until crispy."
        ],
        cookingTime: 40,
        difficulty: "Easy",
        tags: ["Side Dish", "Vegan", "Healthy"]
    },
    {
        title: "Chicken Caesar Wrap",
        description: "Grilled chicken, crisp romaine, and parmesan wrapped in a soft tortilla with Caesar dressing.",
        ingredients: ["flour tortillas", "chicken breast", "romaine lettuce", "caesar dressing", "parmesan cheese", "croutons", "olive oil", "salt", "black pepper"],
        instructions: [
            "Season chicken breast with salt and pepper. Pan-fry in olive oil until cooked through, then slice thinly.",
            "Chop romaine lettuce and crush the croutons slightly.",
            "In a bowl, toss the lettuce, chicken slices, crushed croutons, and parmesan cheese with Caesar dressing.",
            "Warm the flour tortillas slightly to make them pliable.",
            "Divide the Caesar mixture among the tortillas.",
            "Fold the sides in and roll tightly like a burrito. Cut in half to serve."
        ],
        cookingTime: 20,
        difficulty: "Easy",
        tags: ["Lunch", "Chicken", "Quick"]
    }
];
