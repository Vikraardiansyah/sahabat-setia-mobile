import {loginAction, tokenAction, pending, rejected, fulfilled} from '../actions/actionTypes'

const initialValue = {
    response: {},
    token: "",
    isLoading: false,
    isRejected: false,
    isFulfilled: false,
    errorMsg: "",
}

const login = (prevState = initialValue, action) => {
    switch (action.type) {
        case loginAction + pending:
            return {
                ...prevState,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,
            }
        case loginAction + rejected:
            return {
                ...prevState,
                isLoading: false,
                isRejected: true,
                errorMsg: action.payload.response.data.data.message,
            }
        case loginAction + fulfilled:
            return {
                ...prevState,
                isLoading: false,
                isFulfilled: true,
                response: action.payload.data.data
            }
        case tokenAction + pending:
            return {
                ...prevState,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,
            }
        case tokenAction + rejected:
            return {
                ...prevState,
                isLoading: false,
                isRejected: true,
                errorMsg: action.payload.response.data.data.message,
            }
        case tokenAction + fulfilled:
            return {
                ...prevState,
                isLoading: false,
                isFulfilled: true,
                token: action.payload.data.data.token
            }
        default:
            return{
                ...prevState
            }
    }
}

export default login