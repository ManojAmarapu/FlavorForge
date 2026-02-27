import React, { createContext, useContext, useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Toast, ToastType } from '../components/ui/Toast';

interface ToastMessage {
    id: string;
    message: string;
    type: ToastType;
    actionLabel?: string;
    onAction?: () => void;
}

interface ToastContextType {
    showToast: (message: string, type: ToastType, actionLabel?: string, onAction?: () => void) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<ToastMessage[]>([]);

    const showToast = useCallback((message: string, type: ToastType, actionLabel?: string, onAction?: () => void) => {
        const id = Math.random().toString(36).substr(2, 9);
        setToasts((prev) => [...prev, { id, message, type, actionLabel, onAction }]);
    }, []);

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
                <div className="flex flex-col-reverse gap-2 pointer-events-auto">
                    <AnimatePresence>
                        {toasts.map((toast) => (
                            <Toast
                                key={toast.id}
                                id={toast.id}
                                message={toast.message}
                                type={toast.type}
                                actionLabel={toast.actionLabel}
                                onAction={toast.onAction}
                                onClose={removeToast}
                            />
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (context === undefined) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};
