import {addCounter, subCounter} from './actionTypes'

export const countUp = () => {
    return {
        type: addCounter
    }
}
export const countDown = () => {
    return {
        type: subCounter
    }
}