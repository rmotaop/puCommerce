import axios, { AxiosRequestConfig } from "axios";
import { BASE_URL } from "../utils/system";
import {requestBackend} from "../utils/requests";
import {Client} from "../types/client";


export function findPageRequest(page: number, name: string, size=12, sort = 'name') {
    const config: AxiosRequestConfig = {
        method: 'GET',
        url: '/clients',
        params: {
            page: page,
            name: name,
            size: size,
            sort: sort
        }
    }

    return requestBackend(config);
}

export function findById(id: number) {
    return requestBackend({ url:`/clients/${id}` })
}
 
export function deleteById(id: number) {
    const config: AxiosRequestConfig = {
        method: 'DELETE',
        url: `/clients/${id}`,
        withCredentials: true
    }

    return requestBackend(config);
}

export function updateRequest(client: Client) {
    const config: AxiosRequestConfig = {
        method: 'PUT',
        url: `/clients/${client.id}`,
        withCredentials: true,
        data: client
    }

    return requestBackend(config);
}

export function insertRequest(client: Client) {
    const config: AxiosRequestConfig = {
        method: 'POST',
        url: `/clients`,
        withCredentials: true,
        data: client
    }
    return requestBackend(config);
}