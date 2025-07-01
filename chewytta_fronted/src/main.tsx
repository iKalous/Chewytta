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

// 组件
import ProtectedRoute from './components/ProtectedRoute';

// 创建路由
const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/',
        element: (
            <ProtectedRoute>
                <Home />
            </ProtectedRoute>
        ),
    },
    {
        path: '/box/:id',
        element: (
            <ProtectedRoute>
                <BoxDetail />
            </ProtectedRoute>
        ),
    },
    {
        path: '/admin',
        element: (
            <ProtectedRoute requireAdmin={true}>
                <AdminDashboard />
            </ProtectedRoute>
        ),
    },
    {
        path: '/admin/boxes',
        element: (
            <ProtectedRoute requireAdmin={true}>
                <AdminBoxesList />
            </ProtectedRoute>
        ),
    },
    {
        path: '/admin/boxes/new',
        element: (
            <ProtectedRoute requireAdmin={true}>
                <AdminBoxNew />
            </ProtectedRoute>
        ),
    },
    {
        path: '/admin/boxes/edit/:id',
        element: (
            <ProtectedRoute requireAdmin={true}>
                <AdminBoxEdit />
            </ProtectedRoute>
        ),
    },
    {
        path: '/admin/user',
        element: (
            <ProtectedRoute requireAdmin={true}>
                <AdminUserPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/admin/users',
        element: (
            <ProtectedRoute requireAdmin={true}>
                <AdminUsersList />
            </ProtectedRoute>
        ),
    },
    {
        path: '/box/:id/result',
        element: <BoxResultPage />,
    },
    {
        path: '/user/profile',
        element: (
            <ProtectedRoute>
                <UserProfile />
            </ProtectedRoute>
        ),
    },
    {
        path: '/user/favorites',
        element: (
            <ProtectedRoute>
                <UserFavorites />
            </ProtectedRoute>
        ),
    },
    {
        path: '/user/boxes',
        element: (
            <ProtectedRoute>
                <UserBoxes />
            </ProtectedRoute>
        ),
    },
    {
        path: '/register',
        element: <Register />,
    },
]);

// 引入 App 根组件
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App router={router} />
    </React.StrictMode>
);
