import React, { createContext, useContext, useState, ReactNode } from 'react';

export type ModalType = 'info' | 'error' | 'warning' | 'success';

export interface ModalConfig {
    isOpen?: boolean;
    title: string;
    message: string | ReactNode;
    type: ModalType;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
    showCancel?: boolean;
}

interface ModalContextType {
    modalState: ModalConfig;
    showModal: (config: Omit<ModalConfig, 'isOpen'>) => void;
    closeModal: () => void;
}

const defaultState: ModalConfig = {
    isOpen: false,
    title: '',
    message: '',
    type: 'info',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    showCancel: true,
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [modalState, setModalState] = useState<ModalConfig>(defaultState);

    const showModal = (config: Omit<ModalConfig, 'isOpen'>) => {
        setModalState({
            ...defaultState,
            ...config,
            isOpen: true,
        });
    };

    const closeModal = () => {
        setModalState((prev) => ({ ...prev, isOpen: false }));
    };

    return (
        <ModalContext.Provider value={{ modalState, showModal, closeModal }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => {
    const context = useContext(ModalContext);
    if (context === undefined) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};
