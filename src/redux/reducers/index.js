import { combineReducers } from "redux";
import { logoutAction } from "../actions/actionTypes";
import { REHYDRATE } from "redux-persist/lib/constants";
import books from "./books";
import login from "./login"
import register from './register'
import author from './author'
import genre from './genre'
import status from './status'
import borrow from './borrow'
import order from './order'

const appReducer = combineReducers({
    books,
    login,
    register,
    author,
    genre,
    status,
    borrow,
    order,
});

const rootReducer = (state, action) => {
    if (action.type === logoutAction) {
        state = undefined
    } else if (action.type === REHYDRATE) {
        state = action.payload
    }
    return appReducer(state, action)
}

export default rootReducer;