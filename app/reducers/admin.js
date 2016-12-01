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


export default function auth(state = initialState, action = {}) {
    console.log('action is  '+action)
    switch (action.type) {
        case LOGIN_PENDING:
            return Object.assign({}, initialState, {loggingIn: true});
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {user: action.admin.user, loggingIn: false, loginErrors: null});
        case LOGIN_ERROR:
            return {
                ...state,
                loggingIn: false,
                user: null,
                loginErrors: '登入失败'
            };
        case LOGOUT_SUCCESS:
            return {
                loggingIn:true,
                loggingOut: false,
                user: null,
                loginErrors: null
            };
        case FETCH_PROFILE_SUCCESS:
            return Object.assign({}, state, {user: action.payload.user, loggingIn: false, loginErrors: null});
        default:
            return state;
    }
}
