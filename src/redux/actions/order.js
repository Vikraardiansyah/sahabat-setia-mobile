import { getOrderAction, postOrderAction } from './actionTypes'
import { getOrder, postOrder } from '../../utils/http'

export const getOrderActionCreator = (token) => {
    return {
        type: getOrderAction,
        payload: getOrder(token)
    }
}

export const postOrderActionCreator = (body, token) => {
    return {
        type: postOrderAction,
        payload: postOrder(body, token)
    }
}