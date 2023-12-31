import {Store} from "./store";

export type Client = {
    id: number;
    name: string;
    cpf: string;
    income: number;
    birthDate: string;
    children: number;
    email: string;
    stores: Store[];
}