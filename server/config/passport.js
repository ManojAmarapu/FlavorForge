const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://localhost:5000/auth/google/callback', // ensure backend route matches
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // Check if user already exists in our db
                let user = await User.findOne({ googleId: profile.id });

                if (user) {
                    // User exists, return the user
                    done(null, user);
                } else {
                    // If not, create a new user in db
                    user = await User.create({
                        googleId: profile.id,
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        avatar: profile.photos[0].value,
                    });
                    done(null, user);
                }
            } catch (error) {
                console.error('Error during Google OAuth:', error);
                done(error, null);
            }
        }
    )
);

// Passport relies on serialization in session-based auth, 
// but we are using JWT token based auth.
// These are minimal implementations just to avoid passport errors
// if session middleware is ever accidentally invoked.
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});
