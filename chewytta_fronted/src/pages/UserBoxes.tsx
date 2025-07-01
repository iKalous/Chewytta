// src/pages/UserBoxes.tsx
import React from 'react';
import { Link } from 'react-router-dom'; // ✅ 添加这一行

// 模拟数据：用户抽中的盲盒（最多 6 个）
const userBoxes = [
    {
        id: 1,
        name: '神秘盲盒A',
        image: 'https://via.placeholder.com/150',
        price: 29.9,
        date: '2025-04-05',
    },
    {
        id: 2,
        name: '幸运盲盒B',
        image: 'https://via.placeholder.com/150',
        price: 39.9,
        date: '2025-04-04',
    },
    {
        id: 3,
        name: '限量盲盒C',
        image: 'https://via.placeholder.com/150',
        price: 49.9,
        date: '2025-04-03',
    },
];

const UserBoxes: React.FC = () => {
    return (
        <div className="min-h-screen bg-white text-black py-10">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-2xl font-bold text-center mb-6">我抽中的盲盒</h1>

                {/* 展示抽中记录 */}
                {userBoxes.length === 0 ? (
                    <p className="text-center text-gray-500">暂无抽中记录</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {userBoxes.map((box) => (
                            <div key={box.id} className="bg-gray-100 rounded-lg shadow-md overflow-hidden">
                                <img
                                    src={box.image}
                                    alt={box.name}
                                    className="w-full h-40 object-cover"
                                />
                                <div className="p-4">
                                    <h2 className="text-xl font-semibold">{box.name}</h2>
                                    <p className="text-gray-600 mt-1">价格: ￥{box.price.toFixed(2)}</p>
                                    <p className="text-gray-500 text-sm mt-1">抽取时间: {box.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* 返回主页链接 */}
                <div className="mt-8 text-center">
                    <Link to="/" className="text-blue-600 hover:underline">
                        ← 返回首页
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default UserBoxes;
