import { getBooksAction, getBookByIdAction, getBookByRecommendedAction, getBookByRecommendedIdAction, getBookByPageAction, getBookBySearchIdAction, getBookBySearchAction, getBookBySearchPageAction, deleteBookBySearchAction, getBookByGenreAction, getBookByGenreIdAction, getBookByGenrePageAction, deleteBookByGenreAction, putBookAction, postBookAction, borrowBookAction, pending, rejected, fulfilled } from '../actions/actionTypes'
const initialValue = {
    resBooks: [],
    resBooksHome: [],
    resRecommended: [],
    resSearch: [],
    resGenre: [],
    resSearchPage: {},
    resPagination: {},
    resGenrePage: {},
    resBookById: {},
    isLoading: false,
    isRejected: false,
    isFulfilled: false,
    errorBooks: "",

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
                resBooksHome: action.payload.data.data,
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
        case getBookByRecommendedAction + pending:
            return {
                ...prevState,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,
            }
        case getBookByRecommendedAction + rejected:
            return {
                ...prevState,
                isLoading: false,
                isRejected: true,
                errorBooks: action.payload
            }
        case getBookByRecommendedAction + fulfilled:
            return {
                ...prevState,
                isLoading: false,
                isFulfilled: true,
                resRecommended: action.payload.data.data,
            }
        case getBookByRecommendedIdAction:
            const BookByRecommendedId = prevState.resRecommended.filter(
                book => book.id === action.payload
            )
            return {
                ...prevState,
                resBookById: BookByRecommendedId[0],
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
                resSearch: action.payload.data.data,
                resSearchPage: action.payload.data.pagination,
            }
        case getBookBySearchIdAction:
            const searchById = prevState.resSearch.filter(
                book => book.id === action.payload
            )
            return {
                ...prevState,
                resBookById: searchById[0],
            }
        case getBookBySearchPageAction + pending:
            return {
                ...prevState,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,
            }
        case getBookBySearchPageAction + rejected:
            return {
                ...prevState,
                isLoading: false,
                isRejected: true,
                errorBooks: action.payload.response.data.data,
            }
        case getBookBySearchPageAction + fulfilled:
            const dataSearchPage = prevState.resSearch.concat(action.payload.data.data)
            return {
                ...prevState,
                isLoading: false,
                isFulfilled: true,
                resSearch: dataSearchPage,
                resSearchPage: action.payload.data.pagination,
            }
        case deleteBookBySearchAction:
            return {
                ...prevState,
                resSearch: [],
                resSearchPage: {},
            }
        case getBookByGenreAction + pending:
            return {
                ...prevState,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,
            }
        case getBookByGenreAction + rejected:
            return {
                ...prevState,
                isLoading: false,
                isRejected: true,
                errorBooks: action.payload.response.data.data,
            }
        case getBookByGenreAction + fulfilled:
            return {
                ...prevState,
                isLoading: false,
                isFulfilled: true,
                resGenre: action.payload.data.data,
                resGenrePage: action.payload.data.pagination,
            }
        case getBookByGenreIdAction:
            const genreById = prevState.resGenre.filter(
                book => book.id === action.payload
            )
            return {
                ...prevState,
                resBookById: genreById[0],
            }
        case getBookByGenrePageAction + pending:
            return {
                ...prevState,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,
            }
        case getBookByGenrePageAction + rejected:
            return {
                ...prevState,
                isLoading: false,
                isRejected: true,
                errorBooks: action.payload.response.data.data,
            }
        case getBookByGenrePageAction + fulfilled:
            const dataGenrePage = prevState.resGenre.concat(action.payload.data.data)
            return {
                ...prevState,
                isLoading: false,
                isFulfilled: true,
                resGenre: dataGenrePage,
                resGenrePage: action.payload.data.pagination,
            }
        case deleteBookByGenreAction:
            return {
                ...prevState,
                resGenre: [],
                resGenrePage: {},
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