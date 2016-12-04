import {
    LOGIN_PENDING,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT_SUCCESS,
    FETCH_PROFILE_PENDING,
    FETCH_PROFILE_SUCCESS
} from '../actions/user';

const initialState = {
    user: null,
    loggingIn: false,
    loggingOut: false,
    loginErrors: null
};


function createError(message, timestamp) {
    return {
        errorMessage: message,
        timestamp: timestamp
    }
}
export default function auth(state = initialState, action = {}) {
    var nextState = Object.assign({}, state);
    switch (action.type) {
        case LOGIN_PENDING:
            return Object.assign({}, initialState, {loggingIn: true});
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {user: action.admin.user, loggingIn: false, loginErrors: null});
        case LOGIN_ERROR:
            return Object.assign({}, state, {
                user: null,
                loggingIn: false,
                // loginErrors: createError(action.error.message, action.error.timestamp),
                loginErrors: [action.error]
            });
        case LOGOUT_SUCCESS:
            return {
                loggingIn: true,
                loggingOut: false,
                user: null,
                loginErrors: null
            };
        default:
            return state;
    }
}
