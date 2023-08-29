

export type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    imgUrl: string;
    categories: Category[];
    stores: Store[];
}

export type Category = {
    id: number;
    name: string;
}

export type Store = {
    id: number;
    name: string;
    description: string;
    priceMercade: number;
    imgUrl: string;
    categories: Category[];
}