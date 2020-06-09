import {registerAction} from './actionTypes'
import {register} from '../../utils/http'

export const registerActionCreator = (data) => {
        return {
            type: registerAction,
            payload: register(data)
        }
}