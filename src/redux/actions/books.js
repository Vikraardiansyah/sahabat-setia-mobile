import { getBooksAction, getBookByIdAction, getBookByPageAction, getBookBySearchAction, deleteBookBySearchAction, putBookAction, postBookAction, borrowBookAction } from './actionTypes'
import { getBooks, borrowBook, putBook, postBook } from '../../utils/http'

export const getBooksActionCreator = (data) => {
    return {
        type: getBooksAction,
        payload: getBooks(data)
    }
}

export const getBookByIdActionCreator = (id) => {
    return {
        type: getBookByIdAction,
        payload: parseInt(id)
    }
}

export const getBookByPageActionCreator = (data) => {
    return {
        type: getBookByPageAction,
        payload: getBooks(data)
    }
}

export const getBookBySearchActionCreator = (data) => {
    return {
        type: getBookBySearchAction,
        payload: getBooks(data)
    }
}

export const deleteBookBySearchActionCreator = () => {
    return {
        type: deleteBookBySearchAction,
    }
}

export const putBookActionCreator = (id, body) => {
    return {
        type: putBookAction,
        payload: putBook(id, body)
    }
}

export const postBookActionCreator = (body, token) => {
    return {
        type: postBookAction,
        payload: postBook(body, token)
    }
}

export const borrowBookActionCreator = (id, body) => {
    return {
        type: borrowBookAction,
        payload: borrowBook(id, body)
    }
}