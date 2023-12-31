

import axios, { AxiosRequestConfig } from "axios";
import { BASE_URL } from "../utils/system";
import {requestBackend} from "../utils/requests";
import {Role} from "../types/role";


export  function findAllRequest() {
    const config : AxiosRequestConfig = {

        method: "GET",
        url: "/rolies",
    }
    return requestBackend(config);
}

export function findById(id: number) {
    return requestBackend({ url:`/roles/${id}` })
}
 
export function deleteById(id: number) {
    const config: AxiosRequestConfig = {
        method: 'DELETE',
        url: `/rolies/${id}`,
        withCredentials: true
    }

    return requestBackend(config);
}

export function updateRequest(role: Role) {
    const config: AxiosRequestConfig = {
        method: 'PUT',
        url: `/rolies/${role.id}`,
        withCredentials: true,
        data: role
    }

    return requestBackend(config);
}

export function insertRequest(role: Role) {
    const config: AxiosRequestConfig = {
        method: 'POST',
        url: `/rolies`,
        withCredentials: true,
        data: role
    }
    return requestBackend(config);
}