import {loginAction, tokenAction} from './actionTypes'
import {loginUser, tokenUser} from '../../utils/http'

export const loginActionCreator = (body) => {
        return {
            type: loginAction,
            payload: loginUser(body)
        }
}

export const tokenActionCreator = (body) => {
    return {
        type: tokenAction,
        payload: tokenUser(body)
    }
}
