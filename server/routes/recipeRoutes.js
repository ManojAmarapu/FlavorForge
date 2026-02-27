const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const { protect } = require('../middleware/authMiddleware');

// @route   POST /api/recipes
// @desc    Save recipe for logged-in user
// Frontend sends: { userId: string, recipeId: string, recipe: object }
router.post('/', async (req, res) => {
    try {
        const { userId, recipeId, recipe } = req.body;

        if (!userId || !recipeId || !recipe) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const existing = await Recipe.findOne({
            userId,
            recipeId
        });

        if (existing) {
            return res.status(400).json({ message: "Already saved" });
        }

        const newRecipe = new Recipe({
            userId,
            recipeId,
            ...recipe
        });

        await newRecipe.save();

        res.status(201).json({ message: "Recipe saved successfully" });

    } catch (error) {
        console.error("SAVE ROUTE ERROR:", error);
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/recipes
// @desc    Return all recipes for logged-in user
router.get('/', protect, async (req, res) => {
    try {
        const recipes = await Recipe.find({ userId: req.user._id.toString() }).sort({ createdAt: -1 });
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
        if (recipe.userId !== req.user._id.toString()) {
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
