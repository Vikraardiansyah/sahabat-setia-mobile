import {registerAction, pending, rejected, fulfilled} from '../actions/actionTypes'

const initialValue = {
    isLoading: false,
    isRejected: false,
    isFulfilled: false,
    errorMsg: "",
}

const register = (prevState = initialValue, action) => {
    switch (action.type) {
        case registerAction + pending:
            return {
                ...prevState,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,
            }
        case registerAction + rejected:
            return {
                ...prevState,
                isLoading: false,
                isRejected: true,
                errorMsg: action.payload.response.data.data.message,
            }
        case registerAction + fulfilled:
            return {
                ...prevState,
                isLoading: false,
                isFulfilled: true,
            }
        default:
            return{
                ...prevState
            }
    }
}

export default register