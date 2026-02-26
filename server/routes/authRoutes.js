const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Auth with Google
// @route   GET /api/auth/google
router.get(
    '/google',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
        prompt: 'select_account consent',
        accessType: 'offline',
        includeGrantedScopes: false
    })
);

// @desc    Google auth callback
// @route   GET /api/auth/google/callback
router.get(
    '/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: '/login' }),
    (req, res) => {
        // Successful authentication, generate token and return it.
        // Redirecting to the frontend application
        const token = generateToken(req.user._id);
        res.redirect(`https://flavorforge-app.vercel.app/?token=${token}`);
    }
);

// @desc    Get current user
// @route   GET /api/auth/me
router.get('/me', protect, (req, res) => {
    res.json({
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        avatar: req.user.avatar,
    });
});

// @desc    Logout user
// @route   GET /api/auth/logout
router.get('/logout', (req, res) => {
    res.json({ message: 'User logged out successfully. In token-based auth, client should discard token.' });
});

module.exports = router;
