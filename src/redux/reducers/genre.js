import {getGenreAction, postGenreAction, putGenreAction, deleteGenreAction, pending, rejected, fulfilled} from '../actions/actionTypes'
const initialValue = {
    response: [],
    isLoading: false,
    isRejected: false,
    isFulfilled: false,
    errorMsg: {}
}

const genre = (prevState = initialValue, action) => {
    switch (action.type) {
        case getGenreAction + pending:
            return {
                ...prevState,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,
            }
        case getGenreAction + rejected:
            return {
                ...prevState,
                isLoading: false,
                isRejected: true,
                errorMsg: action.payload.response.data.data.message
            }
        case getGenreAction + fulfilled:
            return {
                ...prevState,
                isLoading: false,
                isFulfilled: true,
                response: action.payload.data.data
            }
        case postGenreAction + pending:
            return {
                ...prevState,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,
            }
        case postGenreAction + rejected:
            return {
                ...prevState,
                isLoading: false,
                isRejected: true,
                errorMsg: action.payload.response.data.data.message
            }
        case postGenreAction + fulfilled:
            prevState.response.push(action.payload.data.data)
            return {
                ...prevState,
                isLoading: false,
                isFulfilled: true,
                response: prevState.response
            }
        case putGenreAction + pending:
            return {
                ...prevState,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,
            }
        case putGenreAction + rejected:
            return {
                ...prevState,
                isLoading: false,
                isRejected: true,
                errorMsg: action.payload.response.data.data.message
            }
        case putGenreAction + fulfilled:
            const dataAfterEdit = prevState.response.map(genre => {
                if(genre.id === action.payload.data.data.id) {
                    return action.payload.data.data
                }
                return genre
            })
            return {
                ...prevState,
                isLoading: false,
                isFulfilled: true,
                response: dataAfterEdit
            }
        case deleteGenreAction + pending:
            return {
                ...prevState,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,
            }
        case deleteGenreAction + rejected:
            return {
                ...prevState,
                isLoading: false,
                isRejected: true,
                errorMsg: action.payload.response.data.data.message
            }
        case deleteGenreAction + fulfilled:
            const dataAfterDelete = prevState.response.filter(
                genre => genre.id !== action.payload.data.data.id
            )
            return {
                ...prevState,
                isLoading: false,
                isFulfilled: true,
                response: dataAfterDelete
            }
        default:
            return{
                ...prevState
            }
    }
}

export default genre