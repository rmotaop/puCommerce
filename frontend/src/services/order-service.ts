import {AxiosRequestConfig} from "axios";
import {requestBackend} from "../utils/requests";
import {Order} from "../types/order";

export function findByIdRequest(id: number) {
    const config : AxiosRequestConfig = {
        url: `/orders/${id}`,
        withCredentials: true
    }

    return requestBackend(config);
}

export function placeOrderRequest(cart: Order) {

    const config: AxiosRequestConfig = {
        url: "/orders",
        method: "POST",
        withCredentials: true,
        data: cart
    }
  
    return requestBackend(config);
}


export function findPageRequest(page: number, size=12) {
    const config: AxiosRequestConfig = {
        method: 'GET',
        url: '/orders',
        params: {
            page: page,
            size: size,

        }
    }

    return requestBackend(config);
}

export function findById(id: number) {
    return requestBackend({ url:`/orders/${id}` })
}