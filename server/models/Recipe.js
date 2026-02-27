const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    recipeId: {
        type: String,
        required: true
    },
    title: String,
    ingredients: [String],
    instructions: [String],
    cookingTime: String,
    difficulty: String,
    description: String,
    servings: Number,
    tags: [String],
    matchedIngredients: [String],
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { strict: false });

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;
