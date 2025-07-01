import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-center mb-8">管理员后台</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Link
                        to="/admin/boxes"
                        className="p-6 bg-white rounded shadow hover:shadow-md transition-shadow"
                    >
                        <h2 className="text-xl font-semibold mb-2">管理盲盒</h2>
                        <p>查看、添加、编辑、删除盲盒</p>
                    </Link>

                    <Link
                        to="/admin/users"
                        className="p-6 bg-white rounded shadow hover:shadow-md transition-shadow"
                    >
                        <h2 className="text-xl font-semibold mb-2">管理用户</h2>
                        <p>查看和删除普通用户</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
