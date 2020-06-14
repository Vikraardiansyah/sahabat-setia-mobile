import { getBooksAction, getBookByIdAction, getBookByRecommendedAction, getBookByRecommendedIdAction, getBookByPageAction, getBookBySearchIdAction, getBookBySearchAction, getBookBySearchPageAction, deleteBookBySearchAction, getBookByGenreAction, getBookByGenreIdAction, getBookByGenrePageAction, deleteBookByGenreAction, putBookAction, postBookAction, borrowBookAction } from './actionTypes'
import { getBooks, getBookByRecommended, borrowBook, putBook, postBook } from '../../utils/http'

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

export const getBookByRecommendedActionCreator = () => {
    return {
        type: getBookByRecommendedAction,
        payload: getBookByRecommended()
    }
}
export const getBookByRecommendedIdActionCreator = (id) => {
    return {
        type: getBookByRecommendedIdAction,
        payload: parseInt(id)
    }
}

export const getBookByPageActionCreator = (data) => {
    return {
        type: getBookByPageAction,
        payload: getBooks(data)
    }
}

export const getBookBySearchIdActionCreator = (id) => {
    return {
        type: getBookBySearchIdAction,
        payload: parseInt(id)
    }
}

export const getBookBySearchActionCreator = (data) => {
    return {
        type: getBookBySearchAction,
        payload: getBooks(data)
    }
}

export const getBookBySearchPageActionCreator = (data) => {
    return {
        type: getBookBySearchPageAction,
        payload: getBooks(data)
    }
}

export const deleteBookBySearchActionCreator = () => {
    return {
        type: deleteBookBySearchAction,
    }
}

export const getBookByGenreActionCreator = (data) => {
    return {
        type: getBookByGenreAction,
        payload: getBooks(data)
    }
}

export const getBookByGenreIdActionCreator = (id) => {
    return {
        type: getBookByGenreIdAction,
        payload: parseInt(id)
    }
}

export const getBookByGenrePageActionCreator = (data) => {
    return {
        type: getBookByGenrePageAction,
        payload: getBooks(data)
    }
}
export const deleteBookByGenreActionCreator = () => {
    return {
        type: deleteBookByGenreAction,
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

export const borrowBookActionCreator = (id, body, token) => {
    return {
        type: borrowBookAction,
        payload: borrowBook(id, body, token)
    }
}