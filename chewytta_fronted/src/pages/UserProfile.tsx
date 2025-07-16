// src/pages/UserProfile.tsx
import { Link } from 'react-router-dom';
import React, { useState } from 'react';

const UserProfile: React.FC = () => {
    // 模拟用户数据
    const [user, setUser] = useState({
        username: '用户123',
        phone: '13800001111',
        balance: 100.0,
        avatar: 'https://via.placeholder.com/100',
    });

    const [nickname, setNickname] = useState(user.username);
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSaveNickname = () => {
        setUser({ ...user, username: nickname });
        alert('昵称已修改');
    };

    const handleSavePassword = () => {
        if (!password) {
            alert('请输入旧密码');
            return;
        }
        if (newPassword.length < 6) {
            alert('新密码长度不能小于6位');
            return;
        }
        if (newPassword !== confirmPassword) {
            alert('两次输入的密码不一致');
            return;
        }

        // TODO: 这里可以调用接口提交修改
        alert('密码已修改');
    };


    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setUser({ ...user, avatar: e.target?.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="min-h-screen bg-white text-black py-10">
            <div className="container mx-auto px-4 max-w-md">
                <h1 className="text-2xl font-bold text-center mb-6">我的主页</h1>

                {/* 头像 */}
                <div className="flex flex-col items-center mb-6">
                    <img
                        src={user.avatar}
                        alt="头像"
                        className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
                    />
                    <label className="mt-2 cursor-pointer text-blue-600 hover:underline">
                        <span>上传新头像</span>
                        <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
                    </label>
                </div>

                {/* 昵称修改 */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">昵称</label>
                    <input
                        type="text"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleSaveNickname}
                        className="mt-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        保存昵称
                    </button>
                </div>

                {/* 手机号 */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">手机号</label>
                    <p className="p-2 bg-gray-100 border border-gray-300 rounded">{user.phone}</p>
                </div>

                {/* 账户余额 */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">账户余额</label>
                    <p className="p-2 bg-gray-100 border border-gray-300 rounded">￥{user.balance.toFixed(2)}</p>
                </div>

                {/* 修改密码 */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">旧密码</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <label className="block text-sm font-medium mb-1 mt-2">新密码</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <label className="block text-sm font-medium mb-1 mt-2">确认新密码</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        onClick={handleSavePassword}
                        className="mt-2 px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                        修改密码
                    </button>
                </div>
                {/* 跳转到抽中记录 */}
                <div className="mt-6 text-center">
                    <Link to="/user/boxes" className="text-blue-600 hover:underline">
                        → 查看我抽中的盲盒
                    </Link>
                </div>
                {/* 跳转到收藏页 */}
                <div className="mt-6 text-center">
                    <Link to="/user/favorites" className="text-blue-600 hover:underline">
                        → 查看我的收藏
                    </Link>
                </div>

                {/* 跳转到充值页 */}
                <div className="mt-6 text-center">
                    <Link to="/recharge" className="text-green-600 hover:underline">
                        → 点击充值余额
                    </Link>
                </div>

                {/* 返回首页 */}
                <div className="mt-4 text-center">
                    <Link to="/" className="text-blue-600 hover:underline">
                        ← 返回首页
                    </Link>
                </div>
                {/* 退出登录 */}
                <div className="mt-6">
                    <button
                        onClick={() => {
                            localStorage.removeItem('isLoggedIn');
                            localStorage.removeItem('role');
                            window.location.href = '/login';
                        }}
                        className="w-full py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                        退出登录
                    </button>
                </div>


            </div>
        </div>
    );
};

export default UserProfile;
