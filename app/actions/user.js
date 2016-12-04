require('es6-promise').polyfill();
require('isomorphic-fetch');
import api from '../apiSingleton';
import {getCookie} from '../utils';
import { createActions,createAction } from 'redux-actions';
import {formatAdminLogin} from '../utils/apiResponseFormatter';
export const FETCH_PROFILE_PENDING = 'FETCH_PROFILE_PENDING';
export const FETCH_PROFILE_SUCCESS = 'FETCH_PROFILE_SUCCESS';

export const LOGIN_PENDING = 'LOGIN_PENDING';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export function fetchProfile() {
    let uid = getCookie('uid');

    if (uid === undefined) {
        return {type: 'UID_NOT_FOUND'};
    }

    return {
        type: 'FETCH_PROFILE',
        payload: {
            promise: api.post('/my')
        }
    }
}



function stateIsSuccess(data) {
    return data.state == 'success'
}
function stateIsFailed(data) {
    return data.state == 'failed'
}
export function login(username, password) {
    return (dispatch) => {
        return api.admin.login(username,password,).then((response) => {
            const account = formatAdminLogin(response);
            if (stateIsSuccess(account)){
                dispatch({
                    type:LOGIN_SUCCESS,
                    admin:account
                })
            }
        },(error)=>{
            console.warn('should dispatch error');
            console.warn(createAction(LOGIN_ERROR)(LOGIN_ERROR));
            dispatch(createAction(LOGIN_ERROR)(LOGIN_ERROR))
        })
    }
}

export function logout() {

    return {
        type: 'LOGOUT'
    }
}
