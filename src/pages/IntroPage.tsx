
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ChefHat, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const FloatingElements = ({ opacity = 0.08 }) => {
    const elements = ['🍅', '🥕', '🍳', '🥦', '🍽️'];
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none mix-blend-overlay" style={{ opacity }}>
            {elements.map((icon, i) => (
                <motion.div
                    key={i}
                    animate={{
                        y: ["100vh", "-20vh"],
                        x: [
                            `${Math.sin(i) * 20}vw`,
                            `${Math.cos(i) * 30}vw`
                        ],
                        rotate: [0, 360],
                    }}
                    transition={{
                        duration: 35 + (i * 8),
                        repeat: Infinity,
                        ease: "linear",
                        delay: i * 2,
                    }}
                    className="absolute bottom-[-10%] text-6xl md:text-8xl filter blur-[2px]"
                    style={{ left: `${(i * 20) + 10}%` }}
                >
                    {icon}
                </motion.div>
            ))}
        </div>
    );
};

export const IntroPage = () => {
    const { user, isLoading } = useAuth();

    if (!isLoading && user) {
        return <Navigate to="/app" replace />;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
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
            <FloatingElements opacity={0.08} />

            <div className="text-center z-10 max-w-2xl flex flex-col items-center">
                {/* Logo Reveal Animation */}
                <motion.div
                    className="mb-6 bg-white p-2 rounded-full shadow-[0_0_25px_rgba(16,185,129,0.35)]"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1, y: [0, -10, 0] }}
                    transition={{
                        scale: { type: "spring", stiffness: 200, damping: 15 },
                        opacity: { duration: 0.8 },
                        y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }
                    }}
                >
                    <div className="p-4 bg-transparent rounded-full text-black">
                        <ChefHat className="w-12 h-12" />
                    </div>
                </motion.div>

                {/* Title Animation */}
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                    <h1 className="text-5xl sm:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-teal-700 dark:from-emerald-400 dark:to-teal-300 mb-2 drop-shadow-sm leading-tight">
                        FlavorForge
                    </h1>
                    <p className="text-xl sm:text-2xl text-emerald-800 dark:text-emerald-200 mb-8 font-bold tracking-wide">
                        Your AI Culinary Companion
                    </p>
                    <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-10 font-medium">
                        Discover incredible recipes tailored to your ingredients, powered by artificial intelligence.
                    </p>
                </motion.div>

                {/* Button animation */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <Link to="/login">
                        <motion.button
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 mx-auto bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-2xl hover:shadow-emerald-500/40 transition-shadow group"
                        >
                            Start Cooking
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </motion.div>
    );
};
