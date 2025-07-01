// src/pages/UserFavorites.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// 模拟数据：用户收藏的盲盒
const initialFavorites = [
    {
        id: 1,
        name: '神秘盲盒A',
        price: 29.9,
        image: 'https://via.placeholder.com/150',
    },
    {
        id: 2,
        name: '幸运盲盒B',
        price: 39.9,
        image: 'https://via.placeholder.com/150',
    },
    {
        id: 3,
        name: '限量盲盒C',
        price: 49.9,
        image: 'https://via.placeholder.com/150',
    },
];

const UserFavorites: React.FC = () => {
    const [favorites, setFavorites] = useState(initialFavorites);

    const handleUnfavorite = (id: number) => {
        const updated = favorites.filter((item) => item.id !== id);
        setFavorites(updated);
        alert('已取消收藏');
    };

    return (
        <div className="min-h-screen bg-white text-black py-10">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-2xl font-bold text-center mb-6">我的收藏</h1>

                {favorites.length === 0 ? (
                    <p className="text-center text-gray-500">暂无收藏</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {favorites.map((box) => (
                            <div key={box.id} className="bg-gray-100 rounded-lg shadow-md overflow-hidden">
                                <img
                                    src={box.image}
                                    alt={box.name}
                                    className="w-full h-40 object-cover"
                                />
                                <div className="p-4">
                                    <h2 className="text-xl font-semibold">{box.name}</h2>
                                    <p className="text-gray-600 mt-1">价格: ￥{box.price.toFixed(2)}</p>
                                    <button
                                        onClick={() => handleUnfavorite(box.id)}
                                        className="mt-2 text-red-600 hover:text-red-800"
                                    >
                                        取消收藏 ⭐
                                    </button>
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

export default UserFavorites;
