import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    // 模拟盲盒数据
    const blindBoxes = [
        { id: 1, name: '神秘盲盒A', price: 29.9, image: 'https://via.placeholder.com/150' },
        { id: 2, name: '幸运盲盒B', price: 39.9, image: 'https://via.placeholder.com/150' },
        { id: 3, name: '限量盲盒C', price: 49.9, image: 'https://via.placeholder.com/150' },
        { id: 4, name: '经典盲盒D', price: 19.9, image: 'https://via.placeholder.com/150' },
    ];

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-center mb-8 text-black">盲盒商店</h1>

                {/* 跳转到用户主页 */}
                <div className="text-right mb-4">
                    <Link to="/user/profile" className="text-blue-600 hover:underline">
                        我的主页 →
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {blindBoxes.map((box) => (
                        <div key={box.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <img src={box.image} alt={box.name} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h2 className="text-xl font-semibold">{box.name}</h2>
                                <p className="text-gray-600 mt-1">价格: ￥{box.price.toFixed(2)}</p>
                                <Link
                                    to={`/box/${box.id}`}
                                    className="mt-4 inline-block text-blue-600 hover:underline"
                                >
                                    查看详情 →
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
