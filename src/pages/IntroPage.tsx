import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ChefHat, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const IntroPage = () => {
    const { user, isLoading } = useAuth();

    if (!isLoading && user) {
        return <Navigate to="/app" replace />;
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-100 to-blue-50 dark:from-gray-900 dark:via-emerald-950 dark:to-gray-900 px-4">
            {/* Visual background noise */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.4, 0.2],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-emerald-400 dark:bg-emerald-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px]"
            />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center z-10 max-w-2xl"
            >
                <div className="flex justify-center mb-6">
                    <div className="p-4 bg-gradient-to-tr from-emerald-500 to-teal-500 rounded-full text-white shadow-xl shadow-emerald-500/30">
                        <ChefHat className="w-12 h-12" />
                    </div>
                </div>
                <h1 className="text-5xl sm:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300 mb-6 drop-shadow-sm">
                    FlavorForge
                </h1>
                <p className="text-lg sm:text-2xl text-gray-700 dark:text-gray-300 mb-10 font-medium">
                    Discover incredible recipes tailored to your ingredients, powered by artificial intelligence.
                </p>

                <Link to="/login">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 mx-auto bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-4 rounded-full font-bold text-lg shadow-2xl hover:shadow-emerald-500/20 transition-all group"
                    >
                        Start Cooking
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                </Link>
            </motion.div>
        </div>
    );
};
