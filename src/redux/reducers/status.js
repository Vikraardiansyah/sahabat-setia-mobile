import {getStatusAction, pending, rejected, fulfilled} from '../actions/actionTypes'
const initialValue = {
    response: [],
    isLoading: false,
    isRejected: false,
    isFulfilled: false,
    errorMsg: {}
}

const status = (prevState = initialValue, action) => {
    switch (action.type) {
        case getStatusAction + pending:
            return {
                ...prevState,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,
            }
        case getStatusAction + rejected:
            return {
                ...prevState,
                isLoading: false,
                isRejected: true,
                errorMsg: action.payload.response.data.data.message
            }
        case getStatusAction + fulfilled:
            return {
                ...prevState,
                isLoading: false,
                isFulfilled: true,
                response: action.payload.data.data
            }
        default:
            return{
                ...prevState
            }
    }
}

export default status