import {getOrderAction, postOrderAction, pending, rejected, fulfilled} from '../actions/actionTypes'
const initialValue = {
    resOrder: [],
    isLoading: false,
    isRejected: false,
    isFulfilled: false,
    errorMsg: {}
}

const order = (prevState = initialValue, action) => {
    switch (action.type) {
        case getOrderAction + pending:
            return {
                ...prevState,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,
            }
        case getOrderAction + rejected:
            return {
                ...prevState,
                isLoading: false,
                isRejected: true,
                errorMsg: action.payload.response.data.data.message
            }
        case getOrderAction + fulfilled:
            return {
                ...prevState,
                isLoading: false,
                isFulfilled: true,
                resOrder: action.payload.data.data
            }
        case postOrderAction + pending:
            return {
                ...prevState,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,
            }
        case postOrderAction + rejected:
            return {
                ...prevState,
                isLoading: false,
                isRejected: true,
                errorMsg: action.payload.response.data.data.message
            }
        case postOrderAction + fulfilled:
            const data = action.payload.data.data
            prevState.resOrder.push(data)
            return {
                ...prevState,
                isLoading: false,
                isFulfilled: true,
                resOrder: prevState.resOrder
            }
        default:
            return{
                ...prevState
            }
    }
}

export default order