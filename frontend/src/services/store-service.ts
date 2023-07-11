import axios, { AxiosRequestConfig } from "axios";
import { BASE_URL } from "../utils/system";
import {requestBackend} from "../utils/requests";
import {Store} from "../types/store";


export  function findAllRequest() {
    const config : AxiosRequestConfig = {

        method: "GET",
        url: "/stores",
        
    }

    return requestBackend(config);
}

export function findPageRequest(page: number, name: string, size=12, sort = 'name') {
    const config: AxiosRequestConfig = {
        method: 'GET',
        url: '/stores',
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
    return requestBackend({ url:`/stores/${id}` })
}
 
export function deleteById(id: number) {
    const config: AxiosRequestConfig = {
        method: 'DELETE',
        url: `/stores/${id}`,
        withCredentials: true
    }

    return requestBackend(config);
}

export function updateRequest(store: Store) {
    const config: AxiosRequestConfig = {
        method: 'PUT',
        url: `/stores/${store.id}`,
        withCredentials: true,
        data: store
    }

    return requestBackend(config);
}

export function insertRequest(store: Store) {
    const config: AxiosRequestConfig = {
        method: 'POST',
        url: `/stores`,
        withCredentials: true,
        data: store
    }
    return requestBackend(config);
}