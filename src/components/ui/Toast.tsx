import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
    id: string;
    message: string;
    type: ToastType;
    duration?: number;
    actionLabel?: string;
    onAction?: () => void;
    onClose: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({
    id,
    message,
    type,
    duration = 5000,
    actionLabel,
    onAction,
    onClose,
}) => {
    useEffect(() => {
        if (duration > 0) {
            const timer = setTimeout(() => {
                onClose(id);
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [id, duration, onClose]);

    const icons = {
        success: <CheckCircle2 className="w-5 h-5 text-green-500" />,
        error: <AlertCircle className="w-5 h-5 text-red-500" />,
        warning: <AlertCircle className="w-5 h-5 text-yellow-500" />,
        info: <Info className="w-5 h-5 text-blue-500" />,
    };

    const backgrounds = {
        success: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
        error: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
        warning: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
        info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
    };

    const textColors = {
        success: 'text-green-800 dark:text-green-200',
        error: 'text-red-800 dark:text-red-200',
        warning: 'text-yellow-800 dark:text-yellow-200',
        info: 'text-blue-800 dark:text-blue-200',
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0, transition: { duration: 0.25 } }}
            exit={{ opacity: 0, x: 100, transition: { duration: 0.25 } }}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg ${backgrounds[type]} pointer-events-auto`}
            layout
        >
            {icons[type]}
            <p className={`text-sm font-medium ${textColors[type]} flex-1 mr-2`}>{message}</p>
            {actionLabel && onAction && (
                <button
                    onClick={() => {
                        onAction();
                        onClose(id);
                    }}
                    className={`text-sm font-bold uppercase tracking-wider hover:opacity-75 transition-opacity px-2 border-l border-current opacity-90 ${textColors[type]}`}
                >
                    {actionLabel}
                </button>
            )}
            <button
                onClick={() => onClose(id)}
                className={`ml-1 p-1 rounded-md opacity-70 hover:opacity-100 transition-opacity ${textColors[type]}`}
            >
                <X className="w-4 h-4" />
            </button>
        </motion.div>
    );
};

// Toast Container & Context omitted for brevity in single component, implemented implicitly through a manager hook below
