import { getGenreAction, postGenreAction, putGenreAction, deleteGenreAction } from './actionTypes'
import { getGenre, postGenre, putGenre, deleteGenre } from '../../utils/http'

export const getGenreActionCreator = (token) => {
    return {
        type: getGenreAction,
        payload: getGenre(token)
    }
}

export const postGenreActionCreator = (body) => {
    return {
        type: postGenreAction,
        payload: postGenre(body)
    }
}

export const putGenreActionCreator = (id, body) => {
    return {
        type: putGenreAction,
        payload: putGenre(id, body)
    }
}

export const deleteGenreActionCreator = (id) => {
    return {
        type: deleteGenreAction,
        payload: deleteGenre(id)
    }
}