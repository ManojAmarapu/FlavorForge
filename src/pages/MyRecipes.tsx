import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getMyRecipes, deleteRecipe } from '../services/recipeService';
import { ChefHat, Trash2, Clock, Utensils, ArrowLeft, Search, SlidersHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '../components/ui/Skeleton';
import { useToast } from '../contexts/ToastContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ModalPortal } from '../components/ui/ModalPortal';

export const MyRecipes: React.FC = () => {
    const { user, token, isLoading: authLoading } = useAuth();
    const [recipes, setRecipes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [recipeToDelete, setRecipeToDelete] = useState<any | null>(null);
    const [, setRecentlyDeleted] = useState<any | null>(null);

    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [sortBy, setSortBy] = useState('recent');
    const deleteTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(searchQuery), 300);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    useEffect(() => {
        if (authLoading) return;

        if (!user || !token) {
            navigate('/');
            return;
        }

        const controller = new AbortController();

        const fetchRecipes = async () => {
            try {
                setLoading(true);
                const data = await getMyRecipes(token, controller.signal);
                setRecipes(data);
            } catch (err: any) {
                if (err.name !== 'AbortError') {
                    setError(err.message || 'Failed to load recipes');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();

        return () => controller.abort();
    }, [user, token, authLoading, navigate]);

    const difficultyMap: Record<string, number> = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };

    const filteredAndSortedRecipes = useMemo(() => {
        let result = [...recipes];

        if (debouncedSearch) {
            const lowerSearch = debouncedSearch.toLowerCase();
            result = result.filter(r => r.title.toLowerCase().includes(lowerSearch));
        }

        switch (sortBy) {
            case 'az':
                result.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'time':
                result.sort((a, b) => {
                    const tA = parseInt(a.cookingTime) || 999;
                    const tB = parseInt(b.cookingTime) || 999;
                    return tA - tB;
                });
                break;
            case 'difficulty':
                result.sort((a, b) => (difficultyMap[a.difficulty] || 99) - (difficultyMap[b.difficulty] || 99));
                break;
            case 'recent':
            default:
                break;
        }
        return result;
    }, [recipes, debouncedSearch, sortBy]);

    const { showToast } = useToast();

    const handleUndo = () => {
        setRecentlyDeleted((prevDeleted: any) => {
            if (!prevDeleted) return null;

            if (deleteTimeoutRef.current) {
                clearTimeout(deleteTimeoutRef.current);
            }

            setRecipes((prev) => [prevDeleted, ...prev]);

            return null;
        });
    };

    const confirmDelete = (recipe: any) => {
        setRecipes((prev) => prev.filter((r) => r._id !== recipe._id));
        setRecentlyDeleted(recipe);
        setRecipeToDelete(null);

        showToast('Recipe deleted', 'warning', 'Undo', handleUndo);

        if (deleteTimeoutRef.current) {
            clearTimeout(deleteTimeoutRef.current);
        }

        deleteTimeoutRef.current = setTimeout(async () => {
            if (!token) return;
            try {
                await deleteRecipe(recipe._id, token);
                setRecentlyDeleted(null);
            } catch (error) {
                console.error("Permanent delete failed:", error);
                setRecipes((prev) => [recipe, ...prev]);
                showToast('Failed to permanently delete recipe - restored to list', 'error');
                setRecentlyDeleted(null);
            }
        }, 5000);
    };

    if (authLoading || loading) {
        return (
            <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 px-4 sm:px-0 py-12">
                <div className="flex items-center gap-3 mb-8">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-10 w-64" />
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div key={`skeleton-${index}`} className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-5 space-y-4">
                            <div className="flex justify-between items-start">
                                <Skeleton className="h-6 w-2/3" />
                                <Skeleton className="h-8 w-8 rounded-lg" />
                            </div>
                            <div className="flex gap-2">
                                <Skeleton className="h-6 w-20 rounded" />
                                <Skeleton className="h-6 w-16 rounded" />
                            </div>
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-4/5" />
                            <Skeleton className="h-4 w-3/4" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <p className="text-red-500 bg-red-50 dark:bg-red-900/20 p-4 rounded-lg inline-block">{error}</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 px-4 sm:px-0 pb-12">
            <div className="mb-2">
                <button
                    onClick={() => navigate('/app')}
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 active:text-emerald-700 dark:active:text-emerald-300 transition-colors duration-200 touch-manipulation p-2 -ml-2 rounded-lg w-fit"
                >
                    <ArrowLeft className="h-5 w-5 sm:h-5 sm:w-5" />
                    <span className="text-sm sm:text-base font-medium">Back to Dashboard</span>
                </button>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 mt-2">
                <div className="flex items-center gap-3">
                    <ChefHat className="h-8 w-8 text-emerald-500" />
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100">
                        My Saved Recipes
                    </h1>
                </div>

                {recipes.length > 0 && (
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search recipes..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full sm:w-64 pl-9 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 outline-none transition-all text-sm text-gray-800 dark:text-gray-200"
                            />
                        </div>
                        <div className="relative">
                            <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full sm:w-auto pl-9 pr-8 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 outline-none transition-all text-sm appearance-none text-gray-800 dark:text-gray-200 cursor-pointer"
                            >
                                <option value="recent">Recently Added</option>
                                <option value="az">A–Z</option>
                                <option value="time">Cooking Time</option>
                                <option value="difficulty">Difficulty</option>
                            </select>
                        </div>
                    </div>
                )}
            </div>

            {recipes.length === 0 ? (
                <div className="text-center py-16 bg-white/50 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700">
                    <Utensils className="h-16 w-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        No recipes saved yet
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
                        You haven't saved any recipes to your account. Go back to the Generator and save some delicious ideas!
                    </p>
                    <button
                        onClick={() => navigate('/')}
                        className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg transition-colors shadow-lg"
                    >
                        Find Recipes
                    </button>
                </div>
            ) : (
                <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence>
                        {filteredAndSortedRecipes.map((recipe) => (
                            <motion.div
                                key={recipe._id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2 } }}
                                whileHover={{ scale: 1.02 }}
                                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-md hover:shadow-xl active:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col border border-gray-200 dark:border-gray-700"
                            >
                                <div className="p-5 flex-grow">
                                    <div className="flex justify-between items-start mb-3">
                                        <h3
                                            className="text-xl font-bold text-gray-900 dark:text-gray-100 line-clamp-2 leading-tight"
                                        >
                                            {recipe.title}
                                        </h3>
                                        <button
                                            onClick={() => setRecipeToDelete(recipe)}
                                            className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shrink-0 touch-manipulation"
                                            title="Delete Recipe"
                                        >
                                            <Trash2 className="h-5 w-5" />
                                        </button>
                                    </div>

                                    <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-4">
                                        {recipe.cookingTime && (
                                            <div className="flex items-center gap-1">
                                                <Clock className="h-4 w-4" />
                                                {recipe.cookingTime} min
                                            </div>
                                        )}
                                        {recipe.difficulty && (
                                            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs font-medium">
                                                {recipe.difficulty}
                                            </span>
                                        )}
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2 text-xs sm:text-sm">
                                                <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xs">
                                                    {recipe.ingredients.length}
                                                </span>
                                                Ingredients
                                            </h4>
                                            <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-400 space-y-1">
                                                {recipe.ingredients.slice(0, 3).map((ing: string, i: number) => (
                                                    <li key={i} className="line-clamp-1">{ing}</li>
                                                ))}
                                                {recipe.ingredients.length > 3 && (
                                                    <li className="text-emerald-500 font-medium">+{recipe.ingredients.length - 3} more...</li>
                                                )}
                                            </ul>
                                        </div>

                                        <div className="pt-4 mt-auto">
                                            <button
                                                onClick={() => navigate(`/recipe/${recipe._id || recipe.id}`, { state: { recipe, from: 'saved' } })}
                                                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 active:from-emerald-700 active:to-teal-700 text-white font-medium py-3 px-4 text-sm sm:text-base rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg touch-manipulation"
                                            >
                                                View Recipe
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/30 text-xs text-gray-500 dark:text-gray-400 text-center">
                                    Added {new Date(recipe.createdAt).toLocaleDateString()}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div >
            )}

            <ModalPortal>
                <AnimatePresence>
                    {recipeToDelete && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, transition: { duration: 0.18, ease: "easeOut" } }}
                            className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-md flex items-center justify-center"
                        >
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.95, opacity: 0, transition: { duration: 0.18, ease: "easeOut" } }}
                                className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-[380px] shadow-2xl border border-gray-200 dark:border-gray-700 m-4 relative z-[10000]"
                            >
                                <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">
                                    Delete Recipe?
                                </h3>

                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                                    Are you sure you want to delete
                                    <span className="font-medium text-gray-900 dark:text-gray-200">
                                        {" "}{recipeToDelete.title}
                                    </span>?
                                </p>

                                <div className="flex justify-end gap-3">
                                    <button
                                        onClick={() => setRecipeToDelete(null)}
                                        className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 transition"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        onClick={() => confirmDelete(recipeToDelete)}
                                        className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition shadow-md"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </ModalPortal>
        </div >
    );
};
