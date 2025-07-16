// src/pages/RechargePage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RechargePage: React.FC = () => {
    const [amount, setAmount] = useState<number>(0);
    const navigate = useNavigate();

    const handleRecharge = async () => {
        if (amount <= 0) {
            alert('请输入大于 0 的金额');
            return;
        }

        try {
            const userId = 1; // 示例用户 ID，建议从 localStorage 获取或通过 API 获取当前用户
            const response = await fetch(`/api/users/${userId}/recharge`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount }),
            });

            const result = await response.json();

            if (response.ok) {
                alert(`充值成功！当前余额：￥${result.balance}`);
                navigate('/user/profile'); // 返回个人中心刷新余额
            } else {
                alert(result.message || '充值失败');
            }
        } catch (error) {
            console.error(error);
            alert('网络错误，请重试');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="container mx-auto px-4 max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">账户充值</h2>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">充值金额（元）</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(parseFloat(e.target.value))}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="输入金额"
                        min="0.01"
                        step="0.01"
                    />
                </div>

                <div className="flex space-x-4">
                    <button
                        onClick={handleRecharge}
                        className="flex-1 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                        确认充值
                    </button>
                    <button
                        onClick={() => navigate(-1)}
                        className="flex-1 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                        取消
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RechargePage;
