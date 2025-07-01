// src/components/Toast.tsx
import React from 'react';

interface ToastProps {
    message: string;
    visible: boolean;
}

const Toast: React.FC<ToastProps> = ({ message, visible }) => {
    if (!visible) return null;

    return (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow-md z-50 animate-fade-in-down">
            {message}
        </div>
    );
};

export default Toast;
