// src/components/ProtectedRoute.tsx
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Toast from './Toast'; // 导入 Toast

const isAuthenticated = () => {
    return localStorage.getItem('isLoggedIn') === 'true';
};

const isAdmin = () => {
    return localStorage.getItem('role') === 'admin';
};

interface ProtectedRouteProps {
    children: React.ReactNode;
    requireAdmin?: boolean; // 是否需要管理员权限
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requireAdmin }) => {
    const [showToast, setShowToast] = useState(false);

    if (!isAuthenticated()) {
        return <Navigate to="/login" />;
    }

    if (requireAdmin && !isAdmin()) {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000); // 显示 2 秒后消失
        return <Navigate to="/" />;
    }

    return (
        <>
            {children}
            <Toast message="您没有权限访问该页面" visible={showToast} />
        </>
    );
};

export default ProtectedRoute;
