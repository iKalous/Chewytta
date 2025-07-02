// src/components/ToastProvider.tsx
import React, { useState, useEffect } from 'react';
import { ToastContext } from '../context/ToastContext';
import Toast from './Toast';
import { globalToast } from '../utils/globalToast';

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [showToast, setShowToast] = useState(false);

    const showPermissionDeniedToast = () => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    // 初始化全局方法
    useEffect(() => {
        globalToast.show = () => {
            showPermissionDeniedToast();
        };
    }, []);

    return (
        <ToastContext.Provider value={{ showPermissionDeniedToast }}>
            {children}
            <Toast message="您没有权限访问该页面" visible={showToast} onClose={() => setShowToast(false)} />
        </ToastContext.Provider>
    );
};
