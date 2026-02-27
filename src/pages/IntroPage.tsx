import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const IntroPage = () => {
    const { user, isLoading } = useAuth();
    const [isExiting, setIsExiting] = useState(false);
    const navigate = useNavigate();

    const handleStart = () => {
        setIsExiting(true);
        setTimeout(() => {
            navigate("/login");
        }, 600);
    };

    if (!isLoading && user) {
        return <Navigate to="/app" replace />;
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.6 }}
            className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-emerald-100 via-teal-100 to-sky-200 dark:from-gray-900 dark:via-emerald-950 dark:to-gray-900 px-4"
        >
            {/* 2 Blurred circular blobs */}
            <motion.div
                animate={{
                    scale: [1, 1.25, 1],
                    opacity: [0.5, 0.7, 0.5],
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-emerald-400 dark:bg-emerald-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] pointer-events-none"
            />

            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-sky-300 dark:bg-sky-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] pointer-events-none"
            />

            {/* Floating Cooking Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
                {/* Tomato */}
                <motion.div
                    className="absolute top-16 left-12 text-5xl opacity-10"
                    animate={{ y: [0, -35, 0] }}
                    transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
                >
                    🍅
                </motion.div>

                {/* Carrot */}
                <motion.div
                    className="absolute bottom-24 right-20 text-6xl opacity-10"
                    animate={{ y: [0, 30, 0] }}
                    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                >
                    🥕
                </motion.div>

                {/* Onion */}
                <motion.div
                    className="absolute top-1/3 left-1/4 text-5xl opacity-10"
                    animate={{ y: [0, -25, 0] }}
                    transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
                >
                    🧅
                </motion.div>

                {/* Garlic */}
                <motion.div
                    className="absolute bottom-1/3 left-16 text-4xl opacity-10"
                    animate={{ y: [0, 20, 0] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                >
                    🧄
                </motion.div>

                {/* Knife */}
                <motion.div
                    className="absolute top-1/4 right-12 text-6xl opacity-10 rotate-12"
                    animate={{ y: [0, -28, 0] }}
                    transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
                >
                    🔪
                </motion.div>

                {/* Frying Pan */}
                <motion.div
                    className="absolute bottom-10 right-1/3 text-6xl opacity-10"
                    animate={{ y: [0, 22, 0] }}
                    transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
                >
                    🍳
                </motion.div>

                {/* Leafy Greens */}
                <motion.div
                    className="absolute top-10 right-1/4 text-5xl opacity-10"
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
                >
                    🥬
                </motion.div>
            </div>

            <div className={`text-center z-10 max-w-2xl flex flex-col items-center transition-opacity duration-500 ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
                {/* Logo Reveal Animation */}
                <motion.div
                    className="mb-6 bg-white rounded-full p-3 shadow-lg shadow-emerald-400/20"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1, y: [0, -10, 0] }}
                    transition={{
                        scale: { type: "spring", stiffness: 200, damping: 15 },
                        opacity: { duration: 0.8 },
                        y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }
                    }}
                >
                    <img
                        src="/apple-touch-icon.png"
                        alt="FlavorForge Logo"
                        className="w-14 h-14 object-contain"
                    />
                </motion.div>

                {/* Title Animation */}
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                    <h1 className="text-5xl sm:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-teal-700 dark:from-emerald-400 dark:to-teal-300 mb-2 drop-shadow-sm leading-tight brand-title">
                        FlavorForge
                    </h1>
                    <p className="text-xl sm:text-2xl text-emerald-800 dark:text-emerald-200 mb-8 font-bold tracking-wide brand-title">
                        Your AI Culinary Companion
                    </p>
                    <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-10 font-medium tracking-tight">
                        Discover incredible recipes tailored to your ingredients, powered by artificial intelligence.
                    </p>
                </motion.div>

                {/* Button animation */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <motion.button
                        onClick={handleStart}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 mx-auto bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-2xl hover:shadow-emerald-500/40 transition-shadow group"
                    >
                        Start Cooking
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                </motion.div>
            </div>
        </motion.div>
    );
};
