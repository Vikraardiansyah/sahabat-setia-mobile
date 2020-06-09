import { getStatusAction } from './actionTypes'
import { getStatus } from '../../utils/http'

export const getStatusActionCreator = (token) => {
    return {
        type: getStatusAction,
        payload: getStatus(token)
    }
}