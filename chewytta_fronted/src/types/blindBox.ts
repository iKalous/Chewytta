// src/types/blindBox.ts

export interface Item {
    id: number;
    name: string;
    image: string;
}

export interface BlindBox {
    id: number;
    name: string;
    price: number;
    stock: number;
    isPublished: boolean;
    description: string;
    items: Item[];
}

export interface BlindBoxContextType {
    boxes: BlindBox[];
    setBoxes: React.Dispatch<React.SetStateAction<BlindBox[]>>;
}
