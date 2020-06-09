import {getBorrowAction, getBorrowByIdAction, postBorrowAction, putBorrowAction, pending, rejected, fulfilled} from '../actions/actionTypes'
const initialValue = {
    resBorrow: [],
    isLoading: false,
    isRejected: false,
    isFulfilled: false,
    errorMsg: {}
}

const borrow = (prevState = initialValue, action) => {
    switch (action.type) {
        case getBorrowAction + pending:
            return {
                ...prevState,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,
            }
        case getBorrowAction + rejected:
            return {
                ...prevState,
                isLoading: false,
                isRejected: true,
                errorMsg: action.payload.response.data.data.message
            }
        case getBorrowAction + fulfilled:
            return {
                ...prevState,
                isLoading: false,
                isFulfilled: true,
                resBorrow: action.payload.data.data
            }
        case getBorrowByIdAction + pending:
            return {
                ...prevState,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,
            }
        case getBorrowByIdAction + rejected:
            return {
                ...prevState,
                isLoading: false,
                isRejected: true,
                errorMsg: action.payload.response.data.data
            }
        case getBorrowByIdAction + fulfilled:
            return {
                ...prevState,
                isLoading: false,
                isFulfilled: true,
                resBorrow: action.payload.data.data
            }
        case postBorrowAction + pending:
            return {
                ...prevState,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,
            }
        case postBorrowAction + rejected:
            return {
                ...prevState,
                isLoading: false,
                isRejected: true,
                errorMsg: action.payload.response.data.data
            }
        case postBorrowAction + fulfilled:
            prevState.resBorrow.push(action.payload.data.data)
            return {
                ...prevState,
                isLoading: false,
                isFulfilled: true,
                resBorrow: prevState.resBorrow
            }
        case putBorrowAction + pending:
            return {
                ...prevState,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,
            }
        case putBorrowAction + rejected:
            return {
                ...prevState,
                isLoading: false,
                isRejected: true,
                errorMsg: action.payload.response.data.data
            }
        case putBorrowAction + fulfilled:
            const {id_book, id_user, status, return_at} = action.payload.data.data
            const dataAfterEdit = prevState.resBorrow.map(borrow => {
                if(borrow.id_book === id_book && borrow.id_user === id_user && borrow.status === 2){
                    return {
                        ...borrow,
                        status,
                        return_at,
                    }
                }
                return borrow
            })
            return {
                ...prevState,
                isLoading: false,
                isFulfilled: true,
                resBorrow: dataAfterEdit
            }
        default:
            return{
                ...prevState
            }
    }
}

export default borrow