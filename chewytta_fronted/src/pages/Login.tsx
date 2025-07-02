// src/pages/Login.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

interface LoginForm {
    username: string;
    password: string;
}

const Login: React.FC = () => {
    const [loginType, setLoginType] = useState<'username' | 'phone' | 'email'>('username');

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<LoginForm>();

    const onSubmit = (data: LoginForm) => {
        localStorage.setItem('isLoggedIn', 'true');
        const userRole = data.username === 'root' ? 'admin' : 'user';
        localStorage.setItem('role', userRole);
        window.location.href = userRole === 'admin' ? '/admin' : '/';
    };

    // 切换登录方式时动态设置字段
    const handleLoginTypeChange = (type: 'username' | 'phone' | 'email') => {
        setLoginType(type);
        if (type === 'username') {
            setValue('username', '');
        } else if (type === 'phone') {
            setValue('username', '');
        } else if (type === 'email') {
            setValue('username', '');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
                <h1 className="text-2xl font-bold mb-6 text-center">登录</h1>

                {/* 登录方式切换 */}
                <div className="flex justify-around mb-4 border-b">
                    <button
                        type="button"
                        onClick={() => handleLoginTypeChange('username')}
                        className={`pb-2 ${loginType === 'username' ? 'border-b-2 border-blue-600 font-medium' : ''}`}
                    >
                        用户名
                    </button>
                    <button
                        type="button"
                        onClick={() => handleLoginTypeChange('phone')}
                        className={`pb-2 ${loginType === 'phone' ? 'border-b-2 border-blue-600 font-medium' : ''}`}
                    >
                        手机号
                    </button>
                    <button
                        type="button"
                        onClick={() => handleLoginTypeChange('email')}
                        className={`pb-2 ${loginType === 'email' ? 'border-b-2 border-blue-600 font-medium' : ''}`}
                    >
                        邮箱
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* 动态输入框 */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            {loginType === 'username' ? '用户名' : loginType === 'phone' ? '手机号' : '邮箱'}
                        </label>
                        <input
                            type="text"
                            {...register('username', {
                                required: `${loginType === 'username' ? '用户名' : loginType === 'phone' ? '手机号' : '邮箱'} 是必填项`,
                                validate: (value) => {
                                    if (loginType === 'phone' && !/^1[3-9]\d{9}$/.test(value)) {
                                        return '请输入正确的手机号';
                                    }
                                    if (loginType === 'email' && !/\S+@\S+\.\S+/.test(value)) {
                                        return '请输入正确的邮箱';
                                    }
                                    return true;
                                },
                            })}
                            placeholder={
                                loginType === 'username'
                                    ? '请输入用户名'
                                    : loginType === 'phone'
                                        ? '请输入手机号'
                                        : '请输入邮箱'
                            }
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.username && (
                            <p className="mt-1 text-red-500 text-sm">{errors.username.message}</p>
                        )}
                    </div>

                    {/* 密码 */}
                    <div>
                        <label className="block text-sm font-medium mb-1">密码</label>
                        <input
                            type="password"
                            {...register('password', {
                                required: '密码是必填项',
                                minLength: {
                                    value: 6,
                                    message: '密码至少 6 个字符',
                                },
                            })}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.password && (
                            <p className="mt-1 text-red-500 text-sm">{errors.password.message}</p>
                        )}
                    </div>

                    {/* 登录按钮 */}
                    <button
                        type="submit"
                        className="w-full py-2 mt-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        登录
                    </button>
                </form>

                {/* 注册链接 */}
                <div className="mt-4 text-center">
                    <Link to="/register" className="text-blue-600 hover:underline">
                        ← 没有账号？立即注册
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
