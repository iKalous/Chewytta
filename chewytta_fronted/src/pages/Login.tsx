// src/pages/Login.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
    const [loginType, setLoginType] = useState<'phone' | 'email' | 'username'>('username');
    const [value, setValue] = useState('');
    const [password, setPassword] = useState('');

    // src/pages/Login.tsx

    // src/pages/Login.tsx

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('登录中...', { loginType, value, password });

        // 模拟登录成功
        localStorage.setItem('isLoggedIn', 'true');

        // 设置角色逻辑：如果用户名是 root，则角色为 admin，否则为 user
        if (value === 'root') {
            localStorage.setItem('role', 'admin');
            window.location.href = '/admin'; // 跳转到管理员首页
        } else {
            localStorage.setItem('role', 'user');
            window.location.href = '/'; // 跳转到普通用户首页
        }
    };




    // 如果是 root 用户，则禁止切换登录方式
    const isRootLogin = value === 'root';

    return (
        <div className="flex min-h-[100vh] w-full items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-700">登录</h2>

                <form onSubmit={handleLogin} className="space-y-4">
                    {/* 登录方式切换 */}
                    <div className="flex justify-around mb-4">
                        <label
                            className={`inline-flex items-center space-x-2 ${
                                isRootLogin ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        >
                            <input
                                type="radio"
                                className="form-radio h-4 w-4 text-blue-600"
                                checked={loginType === 'username'}
                                onChange={() => !isRootLogin && setLoginType('username')}
                                disabled={isRootLogin}
                            />
                            <span className="text-gray-700">用户名</span>
                        </label>

                        <label
                            className={`inline-flex items-center space-x-2 ${
                                isRootLogin ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        >
                            <input
                                type="radio"
                                className="form-radio h-4 w-4 text-blue-600"
                                checked={loginType === 'phone'}
                                onChange={() => !isRootLogin && setLoginType('phone')}
                                disabled={isRootLogin}
                            />
                            <span className="text-gray-700">手机号</span>
                        </label>

                        <label
                            className={`inline-flex items-center space-x-2 ${
                                isRootLogin ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        >
                            <input
                                type="radio"
                                className="form-radio h-4 w-4 text-blue-600"
                                checked={loginType === 'email'}
                                onChange={() => !isRootLogin && setLoginType('email')}
                                disabled={isRootLogin}
                            />
                            <span className="text-gray-700">邮箱</span>
                        </label>
                    </div>

                    {/* 输入框 */}
                    <div>
                        {loginType === 'username' ? (
                            <input
                                type="text"
                                placeholder="用户名"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                                required
                            />
                        ) : loginType === 'phone' ? (
                            <input
                                type="tel"
                                placeholder="手机号"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                                required
                            />
                        ) : (
                            <input
                                type="email"
                                placeholder="邮箱"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                                required
                            />
                        )}
                    </div>

                    {/* 密码输入框 */}
                    <div>
                        <input
                            type="password"
                            placeholder="密码"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                            required
                        />
                    </div>

                    {/* 登录按钮 */}
                    <button
                        type="submit"
                        className="w-full py-2 mt-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        登录
                    </button>
                </form>

                {/* 注册链接 */}
                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        没有账号？{' '}
                        <Link to="/register" className="text-blue-600 hover:underline">
                            注册
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
