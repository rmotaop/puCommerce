import {Category} from "./category";
import {Store} from "./store";

export type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    imgUrl: string;
    categories: Category[];
    stores: Store[];
}

