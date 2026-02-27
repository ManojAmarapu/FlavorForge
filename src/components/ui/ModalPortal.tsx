import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface ModalPortalProps {
    children: ReactNode;
}

export const ModalPortal = ({ children }: ModalPortalProps) => {
    if (typeof document === 'undefined') return null;
    return createPortal(children, document.body);
};
