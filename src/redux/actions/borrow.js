import { getBorrowAction, getBorrowByIdAction, postBorrowAction, putBorrowAction } from './actionTypes'
import { getBorrow, getBorrowById, postBorrow, putBorrow } from '../../utils/http'

export const getBorrowActionCreator = (token) => {
    return {
        type: getBorrowAction,
        payload: getBorrow(token)
    }
}

export const getBorrowByIdActionCreator = (id, token) => {
    return {
        type: getBorrowByIdAction,
        payload: getBorrowById(id, token)
    }
}

export const postBorrowActionCreator = (body, token) => {
    return {
        type: postBorrowAction,
        payload: postBorrow(body, token)
    }
}

export const putBorrowActionCreator = (body, token) => {
    return {
        type: putBorrowAction,
        payload: putBorrow(body, token)
    }
}