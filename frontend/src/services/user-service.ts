import axios, {AxiosRequestConfig} from "axios";
import { BASE_URL } from "../utils/system";
import {requestBackend} from "../utils/requests";
import {User} from "../types/user";

export function findMe() {

    const config: AxiosRequestConfig = {
        url:`/users/me`,
        withCredentials: true
    }

    return requestBackend(config);
}

export function findPageRequest(page: number, name: string, size=12, sort = 'name') {
    const config: AxiosRequestConfig = {
        method: 'GET',
        url: '/users',
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
    return requestBackend({ url:`/users/${id}` })
}
 
export function deleteById(id: number) {
    const config: AxiosRequestConfig = {
        method: 'DELETE',
        url: `/users/${id}`,
        withCredentials: true
    }

    return requestBackend(config);
}

export function updateRequest(user: User) {
    const config: AxiosRequestConfig = {
        method: 'PUT',
        url: `/users/${user.id}`,
        withCredentials: true,
        data: user
    }

    return requestBackend(config);
}

export function insertRequest(user: User) {
    const config: AxiosRequestConfig = {
        method: 'POST',
        url: `/users`,
        withCredentials: true,
        data: user
    }
    return requestBackend(config);
}