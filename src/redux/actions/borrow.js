import {getBorrowAction, getBorrowByIdAction, postBorrowAction, putBorrowAction} from './actionTypes'
import {getBorrow, getBorrowById, postBorrow, putBorrow} from '../../utils/http'

export const getBorrowActionCreator = () => {
        return {
            type: getBorrowAction,
            payload: getBorrow()
        }
}

export const getBorrowByIdActionCreator = (id) => {
    return {
        type: getBorrowByIdAction,
        payload: getBorrowById(id)
    }
}

export const postBorrowActionCreator = (body) => {
    return {
        type: postBorrowAction,
        payload: postBorrow(body)
    }
}

export const putBorrowActionCreator = (body) => {
    return {
        type: putBorrowAction,
        payload: putBorrow(body)
    }
}