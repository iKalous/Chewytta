// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';

// 模拟登录状态（后续可改为真实状态）
const isAuthenticated = () => {
    return false; // 默认未登录
};

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    return isAuthenticated() ? <>{children}</> : <Navigate to="/login" />;
};

export default ProtectedRoute;
