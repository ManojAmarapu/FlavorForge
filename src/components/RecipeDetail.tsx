import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Clock, Users, Heart, Copy, Bookmark, BookmarkCheck,
  Play, Pause, SkipForward, Volume2, ChefHat, CheckCircle2, Circle,
  Timer as TimerIcon, X, List
} from 'lucide-react';
// import { Recipe } from '../types/recipe'; -> Not directly used for props anymore
import { useToast } from '../contexts/ToastContext';
import { useAuth } from '../contexts/AuthContext';
import { saveRecipe, getMyRecipes } from '../services/recipeService';

import { useLocation, useNavigate, useParams } from 'react-router-dom';

export const RecipeDetail: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const stateRecipe = location.state?.recipe;
  const from = location.state?.from || 'dashboard';

  const [recipe, setRecipe] = useState<any>(stateRecipe || null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isReading, setIsReading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Smart Assistant States
  const [cookingMode, setCookingMode] = useState(false);
  const [ingredientsExpanded, setIngredientsExpanded] = useState(false);
  const [checkedIngredients, setCheckedIngredients] = useState<number[]>([]);
  const [autoReadAll, setAutoReadAll] = useState(false);
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);

  // Timer States
  const [activeTimer, setActiveTimer] = useState<number | null>(null);
  const [timerLeft, setTimerLeft] = useState(0);

  const { showToast } = useToast();
  const { user, token } = useAuth();
  const timerIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Fetch fallback and initial states
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });

    // Check favorites
    const favs = JSON.parse(localStorage.getItem('recipe-favorites') || '[]');
    setIsFavorite(favs.includes(id as string));

    if (!recipe && id) {
      // Handle backend fallback securely if state is lost and it's a saved recipe
      if (token) {
        getMyRecipes(token).then(saved => {
          const savedMatch = saved.find((r: any) => r._id === id || r.id === id);
          if (savedMatch) setRecipe(savedMatch);
        }).catch(console.error);
      }
    }

    const checkSavedStatus = async () => {
      if (!token || !recipe) return;
      try {
        const savedRecipes = await getMyRecipes(token);
        const alreadySaved = savedRecipes.some((r: any) => r.title === recipe.title);
        setIsSaved(alreadySaved);
      } catch (err) { }
    };
    if (user && recipe) checkSavedStatus();
  }, [id, recipe, token, user]);

  const onToggleFavorite = () => {
    if (!recipe) return;
    const favs = JSON.parse(localStorage.getItem('recipe-favorites') || '[]');
    if (favs.includes(recipe.id || recipe._id)) {
      const newFavs = favs.filter((fid: string) => fid !== (recipe.id || recipe._id));
      localStorage.setItem('recipe-favorites', JSON.stringify(newFavs));
      setIsFavorite(false);
    } else {
      favs.push(recipe.id || recipe._id);
      localStorage.setItem('recipe-favorites', JSON.stringify(favs));
      setIsFavorite(true);
    }
  };

  const onBack = () => {
    if (from === 'saved') navigate('/my-recipes');
    else navigate('/app');
  };

  if (!recipe) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin h-8 w-8 border-4 border-emerald-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  // Voice Initialization
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        let selected = voices.find(v => v.lang.startsWith('en') && v.name.toLowerCase().includes('female'));
        if (!selected) selected = voices.find(v => v.lang.startsWith('en')) || voices[0];
        setVoice(selected);
      }
    };
    loadVoices();
    if (window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  // Timer Cleanup
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, []);

  // Stop reading when exiting cooking mode
  useEffect(() => {
    if (!cookingMode) {
      window.speechSynthesis?.cancel();
      setIsReading(false);
      setAutoReadAll(false);
    }
  }, [cookingMode]);

  // Handle Auto Read Flow
  const readStep = (stepIndex: number, autoContinue: boolean = false) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(recipe.instructions[stepIndex]);
    if (voice) utterance.voice = voice;
    utterance.rate = 0.9;
    utterance.pitch = 1;

    utterance.onstart = () => setIsReading(true);
    utterance.onend = () => {
      setIsReading(false);
      if (autoContinue && stepIndex < recipe.instructions.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else if (autoContinue) {
        setAutoReadAll(false);
      }
    };
    utterance.onerror = () => {
      setIsReading(false);
      setAutoReadAll(false);
    };
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (autoReadAll) {
      readStep(currentStep, true);
    }
  }, [currentStep, autoReadAll]);

  const copyIngredients = () => {
    const text = recipe.ingredients.join('\n');
    navigator.clipboard.writeText(text).then(() => {
      showToast('Ingredients copied to clipboard!', 'success');
    }).catch(() => showToast('Failed to copy ingredients', 'error'));
  };

  const handleSaveRecipe = async () => {
    if (!token || !user) {
      showToast('Please log in to save recipes', 'error');
      return;
    }
    if (!recipe || !recipe.id) {
      showToast('Invalid recipe data', 'error');
      return;
    }
    setIsSaving(true);
    try {
      await saveRecipe(recipe, user.id, token);
      setIsSaved(true);
      showToast('Recipe saved successfully!', 'success');
    } catch (error: any) {
      if (error.message?.toLowerCase().includes('already saved')) setIsSaved(true);
      else showToast(error.message || 'Failed to save', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const playBeep = () => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    } catch (e) { }
  };

  const startTimer = (minutes: number) => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    const totalSeconds = minutes * 60;
    setTimerLeft(totalSeconds);
    setActiveTimer(minutes);

    timerIntervalRef.current = setInterval(() => {
      setTimerLeft(prev => {
        if (prev <= 1) {
          if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
          setActiveTimer(null);
          showToast('Timer Finished!', 'success');
          playBeep();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const toggleIngredient = (index: number) => {
    setCheckedIngredients(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30';
      case 'Medium': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30';
      case 'Hard': return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30';
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  const nextStep = () => {
    if (currentStep < recipe.instructions.length - 1) {
      setAutoReadAll(false);
      window.speechSynthesis.cancel();
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setAutoReadAll(false);
      window.speechSynthesis.cancel();
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleVoicePlay = () => {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsReading(true);
    } else {
      setAutoReadAll(false);
      readStep(currentStep, false);
    }
  };

  const handleVoicePause = () => {
    window.speechSynthesis.pause();
    setIsReading(false);
    setAutoReadAll(false);
  };

  const handleVoiceNext = () => {
    setAutoReadAll(false);
    if (currentStep < recipe.instructions.length - 1) {
      setCurrentStep(prev => {
        readStep(prev + 1, false);
        return prev + 1;
      });
    }
  };

  const renderTimerButton = (instruction: string) => {
    const match = instruction.match(/(\d+)\s*(minute|minutes|min)/i);
    if (match && match[1]) {
      const minutes = parseInt(match[1], 10);
      return (
        <button
          onClick={() => startTimer(minutes)}
          className="mt-4 px-4 py-2 bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-900/40 dark:hover:bg-emerald-800/60 text-emerald-700 dark:text-emerald-300 rounded-lg flex items-center gap-2 transition-colors font-medium border border-emerald-200 dark:border-emerald-700/50 shadow-sm"
        >
          <TimerIcon className="h-4 w-4" />
          Start {minutes} Min Timer
        </button>
      );
    }
    return null;
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="max-w-4xl mx-auto px-4 sm:px-0 pb-20"
      >
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="p-4 sm:p-6">

            {/* Header Controls */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors p-2 -ml-2 rounded-lg"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="text-sm sm:text-base">Back</span>
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={copyIngredients}
                  className="p-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-full transition-all"
                  title="Copy Ingredients"
                >
                  <Copy className="h-5 w-5" />
                </button>
                <button
                  onClick={handleSaveRecipe}
                  disabled={isSaving || isSaved}
                  className={`p-2 rounded-full transition-all ${isSaved ? 'text-emerald-500 bg-emerald-50' : 'text-gray-500 hover:text-emerald-500 hover:bg-emerald-50'}`}
                >
                  {isSaving ? <div className="animate-spin h-5 w-5 border-2 border-emerald-500 border-t-transparent rounded-full" /> : isSaved ? <BookmarkCheck className="h-5 w-5" /> : <Bookmark className="h-5 w-5" />}
                </button>
                <button
                  onClick={onToggleFavorite}
                  className={`p-2 rounded-full transition-all ${isFavorite ? 'text-red-500 hover:bg-red-50' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'}`}
                >
                  <Heart className={`h-6 w-6 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>

            {/* Recipe Title & Meta */}
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2 leading-tight">
                {recipe.title}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg">
                {recipe.description}
              </p>
            </div>

            <div className="flex items-center gap-4 sm:gap-6 mb-6 text-sm text-gray-500 dark:text-gray-400 flex-wrap">
              <div className="flex items-center gap-2"><Clock className="h-5 w-5" />{recipe.cookingTime} mins</div>
              <div className="flex items-center gap-2"><Users className="h-5 w-5" />{recipe.servings || 2} servings</div>
              <span className={`px-3 py-1 rounded-full font-medium ${getDifficultyColor(recipe.difficulty)}`}>
                {recipe.difficulty}
              </span>
            </div>

            {/* Smart Mode Toggle */}
            <div className="flex justify-center mb-8">
              <div className="bg-gray-100 dark:bg-gray-900/50 p-1 rounded-xl flex items-center shadow-inner">
                <button
                  onClick={() => setCookingMode(false)}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${!cookingMode ? 'bg-white dark:bg-gray-800 text-emerald-600 dark:text-emerald-400 shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                >
                  <List className="h-4 w-4" /> Normal View
                </button>
                <button
                  onClick={() => {
                    setCookingMode(true);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${cookingMode ? 'bg-white dark:bg-gray-800 text-emerald-600 dark:text-emerald-400 shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                >
                  <ChefHat className="h-4 w-4" /> Cooking Mode
                </button>
              </div>
            </div>

            {/* Content Layout */}
            <div className={`grid ${!cookingMode ? 'lg:grid-cols-2' : 'grid-cols-1'} gap-6 sm:gap-8`}>

              {/* Ingredients Column */}
              <div className={`${cookingMode ? 'bg-gray-50 dark:bg-gray-900/30 rounded-xl border border-gray-200 dark:border-gray-700/50' : ''}`}>
                <div
                  className={`flex items-center justify-between ${cookingMode ? 'p-4 cursor-pointer' : 'mb-4'}`}
                  onClick={() => cookingMode && setIngredientsExpanded(!ingredientsExpanded)}
                >
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-3">
                    Ingredients
                    {cookingMode && (
                      <span className="text-sm font-normal px-2.5 py-1 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 rounded-full">
                        {checkedIngredients.length} / {recipe.ingredients.length} Ready
                      </span>
                    )}
                  </h2>
                  {cookingMode && (
                    <button className="text-emerald-600 hover:bg-emerald-50 p-2 rounded-lg">
                      {ingredientsExpanded ? 'Collapse' : 'Expand'}
                    </button>
                  )}
                </div>

                <AnimatePresence>
                  {(!cookingMode || ingredientsExpanded) && (
                    <motion.div
                      initial={cookingMode ? { height: 0, opacity: 0 } : false}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={cookingMode ? { height: 0, opacity: 0 } : {}}
                      className={cookingMode ? "px-4 pb-4" : ""}
                    >
                      <ul className="space-y-2">
                        {recipe.ingredients.map((ingredient: string, index: number) => {
                          const isMatched = recipe.matchedIngredients?.includes(ingredient);
                          const isChecked = checkedIngredients.includes(index);
                          return (
                            <li
                              key={index}
                              onClick={() => toggleIngredient(index)}
                              className={`p-3 rounded-lg border-l-4 text-base cursor-pointer transition-colors flex items-center gap-3 ${isChecked
                                ? 'bg-gray-100 dark:bg-gray-800 border-gray-400 text-gray-500 opacity-60 line-through'
                                : isMatched
                                  ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500 text-emerald-800 dark:text-emerald-200'
                                  : 'bg-white dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 shadow-sm'
                                }`}
                            >
                              {isChecked ? <CheckCircle2 className="h-5 w-5 text-gray-400 flex-shrink-0" /> : <Circle className="h-5 w-5 text-emerald-500 flex-shrink-0" />}
                              <span className="flex-1 select-none">{ingredient}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Instructions Column */}
              <div>
                {!cookingMode && (
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Instructions</h2>
                )}

                {cookingMode && (
                  <div className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-emerald-500/20 shadow-xl overflow-hidden mb-6">
                    {/* Voice Control Panel */}
                    <div className="bg-gray-50 dark:bg-gray-900/50 p-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`p-1.5 rounded-full ${isReading ? 'bg-emerald-500 animate-pulse' : 'bg-gray-300 dark:bg-gray-600'}`}>
                          <Volume2 className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Voice Assistant</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={isReading ? handleVoicePause : handleVoicePlay} className="p-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:shadow text-emerald-600 dark:text-emerald-400 transition-all">
                          {isReading ? <Pause className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current" />}
                        </button>
                        <button onClick={handleVoiceNext} className="p-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:shadow text-emerald-600 dark:text-emerald-400 transition-all">
                          <SkipForward className="h-5 w-5" />
                        </button>
                        <button onClick={() => setAutoReadAll(true)} className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${autoReadAll ? 'bg-emerald-500 text-white' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 hover:bg-emerald-200'}`}>
                          Read All
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  {recipe.instructions.map((instruction: string, index: number) => {
                    const isActive = index === currentStep;
                    if (cookingMode && !isActive) return null; // Only show active step in cooking mode

                    return (
                      <motion.div
                        key={index}
                        layout
                        initial={cookingMode ? { opacity: 0, scale: 0.95 } : false}
                        animate={cookingMode ? { opacity: 1, scale: 1 } : { scale: isActive ? 1.02 : 1 }}
                        className={`p-4 rounded-xl border-l-4 transition-all duration-300 ${isActive
                          ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500 shadow-md ring-1 ring-emerald-500/50 z-10'
                          : index < currentStep
                            ? 'bg-green-50 dark:bg-green-900/20 border-green-500 opacity-60'
                            : 'bg-gray-50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 opacity-50'
                          }`}
                      >
                        <div className="flex items-start">
                          <span className={`${cookingMode ? 'w-10 h-10 text-lg' : 'w-8 h-8 text-sm'} flex-shrink-0 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold mr-4`}>
                            {index + 1}
                          </span>
                          <div className="flex-1">
                            <p className={`${cookingMode ? 'text-xl md:text-2xl leading-relaxed py-1' : 'text-base leading-relaxed'} text-gray-800 dark:text-gray-200 font-medium`}>
                              {instruction}
                            </p>
                            {isActive && renderTimerButton(instruction)}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Navigation Controls */}
                <div className="flex items-center justify-between mt-8 gap-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                  <button
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className="px-5 py-2.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 text-gray-700 dark:text-gray-300 font-medium rounded-xl transition-all"
                  >
                    Previous
                  </button>
                  <span className="text-sm font-bold text-gray-400 dark:text-gray-500 tracking-widest uppercase">
                    Step {currentStep + 1} of {recipe.instructions.length}
                  </span>
                  <button
                    onClick={nextStep}
                    disabled={currentStep === recipe.instructions.length - 1}
                    className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-300 text-white font-medium rounded-xl transition-all shadow-md shadow-emerald-500/20"
                  >
                    Next
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating Timer Toast */}
      <AnimatePresence>
        {activeTimer !== null && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-emerald-500/30 p-4 z-50 flex items-center gap-4"
          >
            <div className="bg-emerald-500 p-3 rounded-full shadow-inner animate-pulse">
              <TimerIcon className="h-6 w-6 text-white" />
            </div>
            <div className="pr-4">
              <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider mb-1">Time Remaining</p>
              <p className="text-3xl font-black font-mono text-emerald-600 dark:text-emerald-400 leading-none">
                {formatTimer(timerLeft)}
              </p>
            </div>
            <button
              onClick={() => {
                if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
                setActiveTimer(null);
                showToast('Timer cancelled', 'info');
              }}
              className="p-2 ml-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors group"
            >
              <X className="h-5 w-5 text-gray-500 group-hover:text-red-500 transition-colors" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};