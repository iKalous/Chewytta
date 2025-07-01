// src/pages/AdminUsersList.tsx
import React from 'react';
import { Link } from 'react-router-dom';

// 模拟用户列表
const mockUsers = [
    { id: 1, username: '用户123', email: 'user1@example.com', role: 'user' },
    { id: 2, username: '测试账号', email: 'test@example.com', role: 'user' },
];

const AdminUsersList: React.FC = () => {
    const handleDelete = (id: number) => {
        if (window.confirm('确定要删除这个用户吗？')) {
            alert(`用户 ${id} 删除成功`);
        }
    };

    return (
        <div className="min-h-screen bg-white text-black py-10">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-2xl font-bold text-center mb-6">用户管理</h1>

                <div className="overflow-x-auto">
                    <table className="w-full table-auto border-collapse">
                        <thead>
                        <tr className="bg-gray-100">
                            <th className="border px-4 py-2 text-left">用户名</th>
                            <th className="border px-4 py-2 text-left">邮箱</th>
                            <th className="border px-4 py-2 text-left">操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        {mockUsers.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50">
                                <td className="border px-4 py-2">{user.username}</td>
                                <td className="border px-4 py-2">{user.email}</td>
                                <td className="border px-4 py-2 space-x-2">
                                    <button
                                        onClick={() => handleDelete(user.id)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        删除
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-6 text-center">
                    <Link to="/admin" className="text-blue-600 hover:underline">
                        ← 返回管理员主页
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminUsersList;
