// main.tsx
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter } from 'react-router-dom';

// 页面组件
import Login from './pages/Login';
import Home from './pages/Home';
import BoxDetail from './pages/BoxDetail';
import BoxResultPage from './pages/BoxResultPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminBoxesList from './pages/AdminBoxesList';
import AdminBoxNew from './pages/AdminBoxNew';
import AdminBoxEdit from './pages/AdminBoxEdit';
import UserProfile from './pages/UserProfile';
import UserFavorites from './pages/UserFavorites';
import UserBoxes from './pages/UserBoxes';
import AdminUserPage from './pages/AdminUserPage';
import AdminUsersList from './pages/AdminUsersList';
import Register from './pages/Register';
import ErrorPage from './pages/ErrorPage';

// 组件
import ProtectedRoute from './components/ProtectedRoute';
import { ToastProvider } from './components/ToastProvider';
import ErrorBoundary from './components/ErrorBoundary';

// 引入 Context Provider
import { BlindBoxProvider } from './context/BlindBoxContent.tsx';

// 创建路由
const router = createBrowserRouter([
    {
        path: '/login',
        element: (
            <ErrorBoundary>
                <Login />
            </ErrorBoundary>
        ),
    },
    {
        path: '/',
        element: (
            <ErrorBoundary>
                <ProtectedRoute>
                    <Home />
                </ProtectedRoute>
            </ErrorBoundary>
        ),
    },
    {
        path: '/box/:id',
        element: (
            <ErrorBoundary>
                <ProtectedRoute>
                    <BoxDetail />
                </ProtectedRoute>
            </ErrorBoundary>
        ),
    },
    {
        path: '/admin',
        element: (
            <ErrorBoundary>
                <ProtectedRoute requireAdmin={true}>
                    <AdminDashboard />
                </ProtectedRoute>
            </ErrorBoundary>
        ),
    },
    {
        path: '/admin/boxes',
        element: (
            <ErrorBoundary>
                <ProtectedRoute requireAdmin={true}>
                    <AdminBoxesList />
                </ProtectedRoute>
            </ErrorBoundary>
        ),
    },
    {
        path: '/admin/boxes/new',
        element: (
            <ErrorBoundary>
                <ProtectedRoute requireAdmin={true}>
                    <AdminBoxNew />
                </ProtectedRoute>
            </ErrorBoundary>
        ),
    },
    {
        path: '/admin/boxes/edit/:id',
        element: (
            <ErrorBoundary>
                <ProtectedRoute requireAdmin={true}>
                    <AdminBoxEdit />
                </ProtectedRoute>
            </ErrorBoundary>
        ),
    },
    {
        path: '/admin/user',
        element: (
            <ErrorBoundary>
                <ProtectedRoute requireAdmin={true}>
                    <AdminUserPage />
                </ProtectedRoute>
            </ErrorBoundary>
        ),
    },
    {
        path: '/admin/users',
        element: (
            <ErrorBoundary>
                <ProtectedRoute requireAdmin={true}>
                    <AdminUsersList />
                </ProtectedRoute>
            </ErrorBoundary>
        ),
    },
    {
        path: '/box/:id/result',
        element: (
            <ErrorBoundary>
                <BoxResultPage />
            </ErrorBoundary>
        ),
    },
    {
        path: '/user/profile',
        element: (
            <ErrorBoundary>
                <ProtectedRoute>
                    <UserProfile />
                </ProtectedRoute>
            </ErrorBoundary>
        ),
    },
    {
        path: '/user/favorites',
        element: (
            <ErrorBoundary>
                <ProtectedRoute>
                    <UserFavorites />
                </ProtectedRoute>
            </ErrorBoundary>
        ),
    },
    {
        path: '/user/boxes',
        element: (
            <ErrorBoundary>
                <ProtectedRoute>
                    <UserBoxes />
                </ProtectedRoute>
            </ErrorBoundary>
        ),
    },
    {
        path: '/register',
        element: (
            <ErrorBoundary>
                <Register />
            </ErrorBoundary>
        ),
    },
    {
        path: '/error',
        element: (
            <ErrorBoundary>
                <ErrorPage />
            </ErrorBoundary>
        ),
    },
]);

// App 根组件
import App from './App';

// 渲染入口
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ToastProvider>
            <BlindBoxProvider> {/* ✅ 这里包裹整个 App */}
                <App router={router} />
            </BlindBoxProvider>
        </ToastProvider>
    </React.StrictMode>
);
