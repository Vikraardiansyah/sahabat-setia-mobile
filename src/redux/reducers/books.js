import { getBooksAction, getBookByIdAction, getBookByPageAction, getBookBySearchAction, deleteBookBySearchAction, putBookAction, postBookAction, borrowBookAction, pending, rejected, fulfilled } from '../actions/actionTypes'
const initialValue = {
    resBooks: [],
    resSearch: [],
    resBookById: {},
    isLoading: false,
    isRejected: false,
    isFulfilled: false,
    errorBooks: "",
    resPagination: {},
}

const books = (prevState = initialValue, action) => {
    switch (action.type) {
        case getBooksAction + pending:
            return {
                ...prevState,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,
            }
        case getBooksAction + rejected:
            return {
                ...prevState,
                isLoading: false,
                isRejected: true,
                errorBooks: action.payload,
            }
        case getBooksAction + fulfilled:
            return {
                ...prevState,
                isLoading: false,
                isFulfilled: true,
                resBooks: action.payload.data.data,
                resPagination: action.payload.data.pagination
            }
        case getBookByIdAction:
            const BookById = prevState.resBooks.filter(
                book => book.id === action.payload
            )
            return {
                ...prevState,
                resBookById: BookById[0],
            }
        case getBookByPageAction + pending:
            return {
                ...prevState,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,
            }
        case getBookByPageAction + rejected:
            return {
                ...prevState,
                isLoading: false,
                isRejected: true,
                errorBooks: action.payload.response.data.data,
            }
        case getBookByPageAction + fulfilled:
            const dataPage = prevState.resBooks.concat(action.payload.data.data)
            return {
                ...prevState,
                isLoading: false,
                isFulfilled: true,
                resBooks: dataPage,
                resPagination: action.payload.data.pagination,
            }
        case getBookBySearchAction + pending:
            return {
                ...prevState,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,
            }
        case getBookBySearchAction + rejected:
            return {
                ...prevState,
                isLoading: false,
                isRejected: true,
                errorBooks: action.payload.response.data.data,
            }
        case getBookBySearchAction + fulfilled:
            return {
                ...prevState,
                isLoading: false,
                isFulfilled: true,
                resSearch: action.payload.data.data
            }
        case deleteBookBySearchAction:
            return {
                ...prevState,
                resSearch: [],
            }
        case putBookAction + pending:
            return {
                ...prevState,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,
            }
        case putBookAction + rejected:
            return {
                ...prevState,
                isLoading: false,
                isRejected: true,
                errorBooks: action.payload.response.data.data,
            }
        case putBookAction + fulfilled:
            const data = action.payload.data.data
            const dataAfterEdit = prevState.resBooks.map(book => {
                if (book.id === data.id) {
                    return data
                }
                return book
            })
            return {
                ...prevState,
                isLoading: false,
                isFulfilled: true,
                resBooks: dataAfterEdit,
                resBookById: {
                    ...data
                }
            }
        case postBookAction + pending:
            return {
                ...prevState,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,
            }
        case postBookAction + rejected:
            return {
                ...prevState,
                isLoading: false,
                isRejected: true,
                errorBooks: action.payload.response.data.data,
            }
        case postBookAction + fulfilled:
            prevState.resBooks.push(action.payload.data.data)
            return {
                ...prevState,
                isLoading: false,
                isFulfilled: true,
                resBooks: prevState.resBooks,
            }
        case borrowBookAction + pending:
            return {
                ...prevState,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,
            }
        case borrowBookAction + rejected:
            return {
                ...prevState,
                isLoading: false,
                isRejected: true,
                errorBooks: action.payload.response.data.data,
            }
        case borrowBookAction + fulfilled:
            const { id, id_status, email_borrow, status } = action.payload.data.data
            const dataAfterBorrow = prevState.resBooks.map(book => {
                if (book.id === id) {
                    return {
                        ...book,
                        id_status,
                        status,
                        email_borrow,
                    }
                }
                return book
            })
            return {
                ...prevState,
                isLoading: false,
                isFulfilled: true,
                resBooks: dataAfterBorrow,
                resBookById: {
                    ...prevState.resBookById,
                    id_status,
                    email_borrow,
                    status,
                }
            }
        default:
            return {
                ...prevState
            }
    }
}

export default books