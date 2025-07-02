// src/pages/BoxDetail.tsx
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import useBlindBoxContext from '../hooks/useBlindBoxContent';
import { useComments } from '../hooks/useComments';
import type { Item } from '../types/blindBox';

const BoxDetail: React.FC = () => {
    const { boxes } = useBlindBoxContext();
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [isFavorited, setIsFavorited] = useState(false);

    const initialComments = [
        { id: 1, user: '用户123', content: '太棒了！我抽到了小熊猫～', date: '2025-04-05' },
    ];

    const { comments, newComment, setNewComment, addComment } = useComments(initialComments);

    // 获取当前盲盒
    const box = boxes.find((b) => b.id === Number(id));

    // 如果不存在该盲盒，显示错误信息 + 返回首页按钮
    if (!box) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white text-black p-4">
                <div className="text-center">
                    <p className="text-red-600 text-lg mb-4">⚠️ 盲盒不存在</p>
                    <Link to="/" className="text-blue-600 hover:underline">
                        ← 返回首页
                    </Link>
                </div>
            </div>
        );
    }

    const handleBuy = () => {
        navigate(`/box/${id}/result`);
    };

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addComment();
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="container mx-auto px-4 max-w-3xl">
                {/* 页面内容 */}
                <h1 className="text-3xl font-bold text-center mb-8">盲盒详情 - {box.name}</h1>

                {/* 描述与库存 */}
                <p className="text-lg">{box.description}</p>
                <p className="mt-2">价格: ￥{box.price.toFixed(2)}</p>
                <p>库存: {box.stock} 件</p>
                <p>状态: {box.isPublished ? '已上架' : '未上架'}</p>

                {/* 款式列表 */}
                <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-4">款式列表</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {box.items.map((item: Item) => (
                            <div key={item.id} className="border rounded p-2 text-center">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-24 h-24 object-cover mx-auto"
                                />
                                <p className="mt-2">{item.name}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 收藏按钮 */}
                <button
                    onClick={() => setIsFavorited(!isFavorited)}
                    className={`mt-6 px-4 py-2 rounded ${
                        isFavorited ? 'bg-red-600 text-white' : 'bg-gray-200'
                    }`}
                >
                    {isFavorited ? '取消收藏 ❤️' : '收藏 ⭐'}
                </button>

                {/* 购买按钮 */}
                {box.isPublished && box.stock > 0 && (
                    <button
                        onClick={handleBuy}
                        className="mt-4 w-full py-3 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                        抽一个！花费 ￥{box.price.toFixed(2)}
                    </button>
                )}

                {!box.isPublished && <p className="mt-2 text-red-500">该盲盒已下架</p>}
                {box.stock <= 0 && <p className="mt-2 text-red-500">库存不足</p>}

                {/* 评论区 */}
                <div className="mt-10">
                    <h2 className="text-xl font-semibold mb-4">用户评论</h2>

                    {/* 已有评论 */}
                    <div className="space-y-4">
                        {comments.map((comment) => (
                            <div key={comment.id} className="bg-white p-4 rounded shadow-sm">
                                <p>
                                    <span className="font-semibold">{comment.user}</span>: {comment.content}
                                </p>
                                <small className="text-gray-500">{comment.date}</small>
                            </div>
                        ))}
                    </div>

                    {/* 发表评论 */}
                    <form onSubmit={handleCommentSubmit} className="mt-6">
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="发表你的看法..."
                            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={3}
                            required
                        ></textarea>
                        <button
                            type="submit"
                            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            提交评论
                        </button>
                    </form>
                </div>

                {/* 返回链接 */}
                <div className="mt-8 text-center">
                    <Link to="/" className="text-blue-600 hover:underline">
                        ← 返回首页
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BoxDetail;
