import {Category} from "./category";

export type Store = {
    id: number;
    name: string;
    description: string;
    priceMercade: number;
    imgUrl: string;
    categories: Category[];
}