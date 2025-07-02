// src/components/GlobalToast.tsx
import React, { useContext, useEffect } from 'react';
import Toast from './Toast';
import { ToastContext } from '../context/ToastContext';
import { globalToast } from '../utils/globalToast';

const GlobalToast: React.FC = () => {
    const { showPermissionDeniedToast } = useContext(ToastContext)!;

    // 初始化全局 toast 方法
    useEffect(() => {
        globalToast.show = (/*_message?: string*/) => {
            showPermissionDeniedToast();
        };
    }, [showPermissionDeniedToast]);

    return (
        <Toast
            message="您没有权限访问该页面"
            visible={false}
            onClose={() => {}}
        />
    );
};

export default GlobalToast;
