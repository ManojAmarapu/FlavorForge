import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import { ThemeToggle } from './components/ThemeToggle';
import { MyRecipes } from './pages/MyRecipes';
import { IntroPage } from './pages/IntroPage';
import { LoginPage } from './pages/LoginPage';
import { AppDashboard } from './pages/AppDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { LogIn, LogOut, BookHeart } from 'lucide-react';

const HeaderAuth = () => {
  const { user, login, logout, isLoading } = useAuth();

  if (isLoading) {
    return <div className="h-8 w-8 sm:h-10 sm:w-10 animate-pulse bg-gray-200 dark:bg-gray-700 rounded-full" />;
  }

  if (user) {
    return (
      <div className="flex items-center gap-2 sm:gap-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-1.5 rounded-full shadow-sm border border-gray-200 dark:border-gray-700">
        <img src={user.avatar || 'https://www.gravatar.com/avatar/?d=mp'} alt={user.name} className="w-6 h-6 sm:w-8 sm:h-8 rounded-full" />
        <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:block">
          {user.name.split(' ')[0]}
        </span>
        <Link
          to="/my-recipes"
          className="flex items-center gap-1 p-1 sm:p-1.5 text-gray-500 hover:text-emerald-500 rounded-full hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 transition-colors"
          title="My Recipes"
        >
          <BookHeart className="w-4 h-4 sm:w-5 sm:h-5" />
        </Link>
        <button
          onClick={() => {
            logout();
            window.location.href = '/login';
          }}
          className="p-1 sm:p-1.5 text-gray-500 hover:text-red-500 rounded-full hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 transition-colors"
          title="Logout"
        >
          <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    );
  }

  return (
    <Link
      to="/login"
      className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-full shadow-sm border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-xs sm:text-sm font-medium"
    >
      <LogIn className="w-4 h-4" />
      <span className="hidden sm:inline">Sign In</span>
      <span className="sm:hidden">Login</span>
    </Link>
  );
};

const MainLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2 sm:gap-3">
        <HeaderAuth />
        <ThemeToggle />
      </div>
      {children}
    </div>
  </div>
);

const GlobalControls = () => {
  const location = useLocation();
  const isAuthPage = location.pathname.startsWith('/app') || location.pathname.startsWith('/my-recipes');

  if (isAuthPage) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2 sm:gap-3">
      <ThemeToggle />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastProvider>
          <ThemeProvider>
            <GlobalControls />
            <Routes>
              <Route path="/" element={<IntroPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/app"
                element={
                  <ProtectedRoute>
                    <MainLayout>
                      <AppDashboard />
                    </MainLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/my-recipes"
                element={
                  <ProtectedRoute>
                    <MainLayout>
                      <MyRecipes />
                    </MainLayout>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </ThemeProvider>
        </ToastProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;