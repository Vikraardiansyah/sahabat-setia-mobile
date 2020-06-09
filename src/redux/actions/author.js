import { getAuthorAction, postAuthorAction, putAuthorAction, deleteAuthorAction } from './actionTypes'
import { getAuthor, postAuthor, putAuthor, deleteAuthor } from '../../utils/http'

export const getAuthorActionCreator = (token) => {
    return {
        type: getAuthorAction,
        payload: getAuthor(token)
    }
}

export const postAuthorActionCreator = (body) => {
    return {
        type: postAuthorAction,
        payload: postAuthor(body)
    }
}

export const putAuthorActionCreator = (id, body) => {
    return {
        type: putAuthorAction,
        payload: putAuthor(id, body)
    }
}

export const deleteAuthorActionCreator = (id) => {
    return {
        type: deleteAuthorAction,
        payload: deleteAuthor(id)
    }
}