const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
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

// @route POST /auth/register
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            provider: 'local'
        });

        const token = generateToken(user._id);

        res.json({
            token,
            user
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// @route POST /auth/login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user || user.provider !== 'local') {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user._id);

        res.json({
            token,
            user
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

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
