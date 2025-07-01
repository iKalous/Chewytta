// src/App.tsx
import React from 'react';
import { type RouterProviderProps, RouterProvider } from 'react-router-dom'; // ✅ 添加 RouterProvider 导入
import Toast from './components/Toast';

interface AppProps {
    router: RouterProviderProps['router'];
}

const App: React.FC<AppProps> = ({ router }) => {
    return (
        <>
            <React.Suspense fallback="Loading...">
                <RouterProvider router={router} />
            </React.Suspense>
            <Toast message="您没有权限访问该页面" visible={false} />
        </>
    );
};

export default App;
