// src/pages/ErrorPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black p-4">
            <h1 className="text-3xl font-bold mb-4">发生错误</h1>
            <p className="mb-6 text-center">页面加载时发生了意外错误，请尝试刷新或返回首页。</p>

            <div className="space-x-4">
                <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    刷新页面
                </button>
                <Link
                    to="/"
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                    返回首页
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;
