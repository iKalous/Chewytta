// src/pages/AdminBoxesList.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import useBlindBoxContext from '../hooks/useBlindBoxContent';

const AdminBoxesList: React.FC = () => {
    const { boxes } = useBlindBoxContext();

    return (
        <div className="min-h-screen bg-white text-black py-10">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-2xl font-bold text-center mb-6">管理盲盒</h1>

                {/* 新增按钮 */}
                <div className="flex justify-end mb-4">
                    <Link
                        to="/admin/boxes/new"
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                        + 新增盲盒
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full table-auto border-collapse">
                        <thead>
                        <tr className="bg-gray-100">
                            <th className="border px-4 py-2 text-left">名称</th>
                            <th className="border px-4 py-2 text-left">价格</th>
                            <th className="border px-4 py-2 text-left">库存</th>
                            <th className="border px-4 py-2 text-left">状态</th>
                            <th className="border px-4 py-2 text-left">操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        {boxes.map((box) => (
                            <tr key={box.id} className="hover:bg-gray-50">
                                <td className="border px-4 py-2">{box.name}</td>
                                <td className="border px-4 py-2">￥{box.price.toFixed(2)}</td>
                                <td className="border px-4 py-2">{box.stock}</td>
                                <td className="border px-4 py-2">
                                    {box.isPublished ? '已上架' : '未上架'}
                                </td>
                                <td className="border px-4 py-2 space-x-2">
                                    <Link
                                        to={`/admin/boxes/edit/${box.id}`}
                                        className="text-blue-600 hover:underline"
                                    >
                                        编辑
                                    </Link>
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

export default AdminBoxesList;
