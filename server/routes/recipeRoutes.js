const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const { protect } = require('../middleware/authMiddleware');

// @route   POST /api/recipes
// @desc    Save recipe for logged-in user
router.post('/', protect, async (req, res) => {
    try {
        const { title, ingredients, instructions, cookingTime, difficulty } = req.body;

        // Check for duplicate recipe for this user
        const existingRecipe = await Recipe.findOne({ user: req.user._id, title });
        if (existingRecipe) {
            return res.status(400).json({ message: 'Recipe with this title already exists for user' });
        }

        const recipe = await Recipe.create({
            user: req.user._id,
            title,
            ingredients,
            instructions,
            cookingTime,
            difficulty
        });

        res.status(201).json(recipe);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET /api/recipes
// @desc    Return all recipes for logged-in user
router.get('/', protect, async (req, res) => {
    try {
        const recipes = await Recipe.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(recipes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   DELETE /api/recipes/:id
// @desc    Delete recipe owned by user
router.delete('/:id', protect, async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);

        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        // Make sure user owns the recipe
        if (recipe.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await recipe.deleteOne();
        res.json({ message: 'Recipe removed' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
