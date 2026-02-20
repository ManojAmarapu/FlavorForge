import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { ThemeToggle } from './components/ThemeToggle';
import { RecipeGenerator } from './components/RecipeGenerator';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4 py-6 sm:py-8">
          <div className="fixed top-4 right-4 z-50 sm:top-4 sm:right-4">
            <ThemeToggle />
          </div>
          <RecipeGenerator />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;