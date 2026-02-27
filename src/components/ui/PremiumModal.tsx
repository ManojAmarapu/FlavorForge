import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { useModal } from '../../contexts/ModalContext';
import { AlertCircle, CheckCircle2, Info, AlertTriangle } from 'lucide-react';

export const PremiumModal: React.FC = () => {
    const { modalState, closeModal } = useModal();
    const { isOpen, title, message, type, confirmText, cancelText, onConfirm, showCancel } = modalState;
    const modalRef = useRef<HTMLDivElement>(null);

    // Handle ESC close
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                closeModal();
            }
        };
        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, closeModal]);

    // Focus trap
    useEffect(() => {
        if (isOpen && modalRef.current) {
            const focusableElements = modalRef.current.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            if (focusableElements.length) {
                (focusableElements[0] as HTMLElement).focus();
            }
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleConfirm = () => {
        if (onConfirm) onConfirm();
        closeModal();
    };

    const getIcon = () => {
        switch (type) {
            case 'success':
                return <CheckCircle2 className="h-6 w-6 text-emerald-500" />;
            case 'warning':
                return <AlertTriangle className="h-6 w-6 text-amber-500" />;
            case 'error':
                return <AlertCircle className="h-6 w-6 text-red-500" />;
            case 'info':
            default:
                return <Info className="h-6 w-6 text-blue-500" />;
        }
    };

    const getPrimaryButtonColor = () => {
        switch (type) {
            case 'error':
                return 'bg-red-500 hover:bg-red-600 shadow-red-500/20';
            case 'warning':
                return 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/20';
            case 'success':
            case 'info':
            default:
                return 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/20';
        }
    };

    const modalContent = (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.18, ease: "easeOut" } }}
                    className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-md flex items-center justify-center p-4"
                    onClick={(e) => {
                        if (e.target === e.currentTarget && (!onConfirm || showCancel)) {
                            closeModal();
                        }
                    }}
                >
                    <motion.div
                        ref={modalRef}
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0, transition: { duration: 0.18, ease: "easeOut" } }}
                        className="bg-white dark:bg-white/10 backdrop-blur-lg rounded-2xl p-6 w-full max-w-sm sm:max-w-md shadow-2xl border border-gray-200 dark:border-white/10 relative"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-title"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className={`p-2 rounded-full bg-gray-100 dark:bg-gray-700/50 flex-shrink-0`}>
                                {getIcon()}
                            </div>
                            <h3 id="modal-title" className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white/90">
                                {title}
                            </h3>
                        </div>

                        <div className="text-sm sm:text-base text-gray-600 dark:text-white/70 mb-6 font-medium">
                            {message}
                        </div>

                        <div className="flex justify-end gap-3">
                            {showCancel !== false && (
                                <button
                                    onClick={closeModal}
                                    className="px-4 py-2 font-medium rounded-lg bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-800 dark:text-white/90 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600"
                                >
                                    {cancelText || 'Cancel'}
                                </button>
                            )}

                            <button
                                onClick={handleConfirm}
                                className={`px-4 py-2 font-medium rounded-lg text-white transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${getPrimaryButtonColor()}`}
                            >
                                {confirmText || 'Confirm'}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );

    return createPortal(modalContent, document.body);
};
