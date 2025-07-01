import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { blindBoxes as mockBoxes } from "../data/mockBoxes";

// 模拟数据源
// const mockBoxes = [
//     {
//         id: 1,
//         name: '神秘盲盒A',
//         price: 29.9,
//         stock: 100,
//         isPublished: true,
//         description: '内含多种隐藏款式，惊喜不断！',
//         items: [
//             { id: 1, name: '隐藏款 - 小熊猫', image: 'https://via.placeholder.com/150' },
//             { id: 2, name: '普通款 - 蓝精灵', image: 'https://via.placeholder.com/150' },
//         ],
//     },
// ];

const AdminBoxEdit: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    // ✅ 先查找当前盲盒
    const currentBox = mockBoxes.find((box) => box.id === Number(id));

    // ✅ 然后定义所有 state（即使 currentBox 是 undefined）
    const [name, setName] = useState<string>(currentBox?.name || '');
    const [description, setDescription] = useState<string>(currentBox?.description || '');
    const [price, setPrice] = useState<number>(currentBox?.price ?? 0);
    const [stock, setStock] = useState<number>(currentBox?.stock ?? 0);
    const [isPublished, setIsPublished] = useState<boolean>(currentBox?.isPublished ?? false);
    const [items, setItems] = useState<Array<{ id: number; name: string; image: string }>>(
        currentBox?.items || []
    );

    const [loading, setLoading] = useState(false);


    // ✅ 最后再判断是否返回错误页面
    if (!currentBox) {
        return <div className="text-center mt-10">未找到该盲盒</div>;
    }

    // ✅ 表单提交逻辑
    // const handleSubmit = (e: React.FormEvent) => {
    //     e.preventDefault();
    //     alert('保存成功');
    //     navigate('/admin/boxes');
    // };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await updateBox({
                id: currentBox.id,
                name,
                description,
                price,
                stock,
                isPublished,
                items,
            });

            alert('保存成功');
            navigate('/admin/boxes');
        } catch  {
            alert('保存失败，请重试');
        } finally {
            setLoading(false);
        }
    };


    const handleItemChange = (itemId: number, field: 'name' | 'image', value: string) => {
        const updated = items.map((item) =>
            item.id === itemId ? { ...item, [field]: value } : item
        );
        setItems(updated);
    };

    const handleAddItem = () => {
        const newItem = { id: Date.now(), name: '', image: '' };
        setItems([...items, newItem]);
    };

    const handleRemoveItem = (itemId: number) => {
        if (items.length <= 1) return;
        const updated = items.filter((item) => item.id !== itemId);
        setItems(updated);
    };

    // 模拟 API 请求
    const updateBox = async (updatedBox: typeof currentBox) => {
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                const index = mockBoxes.findIndex((box) => box.id === updatedBox.id);
                if (index > -1) {
                    mockBoxes[index] = updatedBox;
                    resolve();
                } else {
                    reject(new Error('更新失败'));
                }
            }, 800);
        });
    };



    return (
        <div className="min-h-screen bg-white text-black py-10">
            <div className="container mx-auto px-4 max-w-3xl">
                <h1 className="text-2xl font-bold text-center mb-6">编辑盲盒</h1>

                <form onSubmit={handleSubmit}>
                    {/* 名称 */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">名称</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    {/* 描述 */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">描述</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            rows={3}
                            required
                        ></textarea>
                    </div>

                    {/* 价格 & 库存 */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">价格（元）</label>
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(parseFloat(e.target.value))}
                                className="w-full p-2 border border-gray-300 rounded"
                                min="0"
                                step="0.01"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">库存</label>
                            <input
                                type="number"
                                value={stock}
                                onChange={(e) => setStock(parseInt(e.target.value))}
                                className="w-full p-2 border border-gray-300 rounded"
                                min="0"
                                required
                            />
                        </div>
                    </div>

                    {/* 是否上架 */}
                    <div className="mb-4 flex items-center">
                        <input
                            type="checkbox"
                            checked={isPublished}
                            onChange={(e) => setIsPublished(e.target.checked)}
                            className="mr-2"
                        />
                        <label>是否上架</label>
                    </div>

                    {/* 款式列表 */}
                    <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-semibold">款式列表</h3>
                            <button
                                type="button"
                                onClick={handleAddItem}
                                className="text-blue-600 hover:text-blue-800"
                            >
                                + 添加款式
                            </button>
                        </div>

                        {items.map((item) => (
                            <div key={item.id} className="border p-3 rounded mb-2 relative">
                                <button
                                    type="button"
                                    onClick={() => handleRemoveItem(item.id)}
                                    className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                                >
                                    ✕
                                </button>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">款式名称</label>
                                        <input
                                            type="text"
                                            value={item.name}
                                            onChange={(e) => handleItemChange(item.id, 'name', e.target.value)}
                                            className="w-full p-2 border border-gray-300 rounded"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">图片链接</label>
                                        <input
                                            type="text"
                                            value={item.image}
                                            onChange={(e) => handleItemChange(item.id, 'image', e.target.value)}
                                            className="w-full p-2 border border-gray-300 rounded"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 按钮 */}
                    <div className="flex space-x-4">
                        <button
                            type="submit"
                            className={`px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                            disabled={loading}
                        >
                            {loading ? '保存中...' : '保存修改'}
                        </button>
                        <Link to="/admin/boxes" className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                            取消
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminBoxEdit;
