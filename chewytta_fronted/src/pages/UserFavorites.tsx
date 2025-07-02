// src/pages/UserFavorites.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useBlindBoxContext from '../hooks/useBlindBoxContent';

const UserFavorites: React.FC = () => {
    const { boxes } = useBlindBoxContext();

    // 模拟用户收藏的 ID（可以替换为 API 或 localStorage）
    const [favoriteIds, setFavoriteIds] = useState<number[]>([1, 2]);

    // 根据 favoriteIds 过滤出用户收藏的盲盒
    const favorites = boxes.filter(box => favoriteIds.includes(box.id));

    // 取消收藏
    const handleUnfavorite = (id: number) => {
        setFavoriteIds(prev => prev.filter(fid => fid !== id));
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
                                    src={box.items[0]?.image || 'https://via.placeholder.com/150'}
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
