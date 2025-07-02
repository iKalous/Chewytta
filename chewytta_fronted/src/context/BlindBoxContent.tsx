// src/context/BlindBoxContent.tsx
import  { useState } from 'react';
// import { BlindBoxContext } from './BlindBoxContext';
import {BlindBoxContext} from "./BlindBoxContent";
import type { BlindBox } from '../types/blindBox';

export const BlindBoxProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [boxes, setBoxes] = useState<BlindBox[]>([
        {
            id: 1,
            name: '神秘盲盒A',
            price: 29.9,
            stock: 100,
            isPublished: true,
            description: '内含多种隐藏款式，惊喜不断！',
            items: [
                { id: 1, name: '隐藏款 - 小熊猫', image: 'https://via.placeholder.com/150' },
                { id: 2, name: '稀有款 - 飞天猫', image: 'https://via.placeholder.com/150' },
                { id: 3, name: '普通款 - 蓝精灵', image: 'https://via.placeholder.com/150' },
            ],
        },
    ]);

    return (
        <BlindBoxContext.Provider value={{ boxes, setBoxes }}>
            {children}
        </BlindBoxContext.Provider>
    );
};
