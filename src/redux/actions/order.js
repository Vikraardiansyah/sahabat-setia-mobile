import {getOrderAction, postOrderAction} from './actionTypes'
import {getOrder, postOrder} from '../../utils/http'

export const getOrderActionCreator = () => {
        return {
            type: getOrderAction,
            payload: getOrder()
        }
}

export const postOrderActionCreator = (body) => {
    return {
        type: postOrderAction,
        payload: postOrder(body)
    }
}