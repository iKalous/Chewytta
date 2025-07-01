// src/pages/AdminBoxesList.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { blindBoxes as mockBoxes } from "../data/mockBoxes";


// 模拟数据：盲盒列表
// const mockBoxes = [
//     {
//         id: 1,
//         name: '神秘盲盒A',
//         price: 29.9,
//         stock: 100,
//         isPublished: true,
//         description: '内含多种隐藏款式，惊喜不断！',
//     },
//     {
//         id: 2,
//         name: '幸运盲盒B',
//         price: 39.9,
//         stock: 50,
//         isPublished: false,
//         description: '稀有款出现概率更高',
//     },
// ];

const AdminBoxesList: React.FC = () => {
    const handleDelete = (id: number) => {
        if (window.confirm('确定要删除这个盲盒吗？')) {
            const index = mockBoxes.findIndex(box => box.id === id);
            if (index > -1) {
                mockBoxes.splice(index, 1); // 删除数据
                alert('删除成功');
                window.location.reload(); // 刷新页面显示最新列表
            }
        }
    };

    return (
        <div className="min-h-screen bg-white text-black py-10">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-2xl font-bold text-center mb-6">盲盒管理</h1>

                {/* 添加盲盒按钮 */}
                <div className="mb-6 text-right">
                    <Link to="/admin/boxes/new" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        + 新增盲盒
                    </Link>
                </div>

                {/* 盲盒列表 */}
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
                        {mockBoxes.map((box) => (
                            <tr key={box.id} className="hover:bg-gray-50">
                                <td className="border px-4 py-2">{box.name}</td>
                                <td className="border px-4 py-2">￥{box.price.toFixed(2)}</td>
                                <td className="border px-4 py-2">{box.stock}</td>
                                <td className="border px-4 py-2">{box.isPublished ? '已上架' : '未上架'}</td>
                                <td className="border px-4 py-2 space-x-2">
                                    <Link to={`/admin/boxes/edit/${box.id}`} className="text-blue-600 hover:underline">
                                        编辑
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(box.id)}
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
            </div>
        </div>
    );
};

export default AdminBoxesList;
