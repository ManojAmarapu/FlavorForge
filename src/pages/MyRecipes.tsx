import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getMyRecipes, deleteRecipe } from '../services/recipeService';
import { ChefHat, Trash2, Clock, Utensils } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '../components/ui/Skeleton';
import { useToast } from '../contexts/ToastContext';
import { CulinaryBackground } from '../components/CulinaryBackground';

export const MyRecipes: React.FC = () => {
    const { user, token, isLoading: authLoading } = useAuth();
    const [recipes, setRecipes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (authLoading) return;

        if (!user || !token) {
            navigate('/');
            return;
        }

        fetchRecipes();
    }, [user, token, authLoading, navigate]);

    const fetchRecipes = async () => {
        if (!token) return;
        try {
            setLoading(true);
            const data = await getMyRecipes(token);
            setRecipes(data);
        } catch (err: any) {
            setError(err.message || 'Failed to load recipes');
        } finally {
            setLoading(false);
        }
    };

    const { showToast } = useToast();

    const handleDelete = async (id: string) => {
        if (!token) return;
        if (!window.confirm('Are you sure you want to delete this recipe?')) return;

        try {
            await deleteRecipe(id, token);
            setRecipes((prev) => prev.filter((r) => r._id !== id));
            showToast('Recipe deleted successfully', 'success');
        } catch (err: any) {
            showToast(err.message || 'Failed to delete recipe', 'error');
        }
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
        <>
            <CulinaryBackground />
            <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 px-4 sm:px-0 pb-12">
                <div className="flex items-center gap-3 mb-8">
                    <ChefHat className="h-8 w-8 text-emerald-500" />
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100">
                        My Saved Recipes
                    </h1>
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
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {recipes.map((recipe) => (
                            <div key={recipe._id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col">
                                <div className="p-5 flex-grow">
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 line-clamp-2">
                                            {recipe.title}
                                        </h3>
                                        <button
                                            onClick={() => handleDelete(recipe._id)}
                                            className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shrink-0"
                                            title="Delete Recipe"
                                        >
                                            <Trash2 className="h-5 w-5" />
                                        </button>
                                    </div>

                                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
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
                                            <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2 text-sm">
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
                                    </div>
                                </div>

                                <div className="p-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 text-xs text-gray-500 dark:text-gray-400 text-center">
                                    Added {new Date(recipe.createdAt).toLocaleDateString()}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};
