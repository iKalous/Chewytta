// src/utils/localStorage.ts

interface DrawnBox {
    id: number;
    name: string;
    image: string;
    price: number;
    date: string;
}

const USER_BOXES_KEY = 'user_boxes';

// 获取当前用户抽中的盲盒列表（模拟用户ID为1）
export const getUserBoxes = (): DrawnBox[] => {
    const data = localStorage.getItem(USER_BOXES_KEY);
    return data ? JSON.parse(data) : [];
};

// 添加一个抽中记录
export const addBoxToUserBoxes = (box: DrawnBox) => {
    const list = getUserBoxes();
    const updatedList = [box, ...list].slice(0, 6); // 最多保留6个
    localStorage.setItem(USER_BOXES_KEY, JSON.stringify(updatedList));
};
