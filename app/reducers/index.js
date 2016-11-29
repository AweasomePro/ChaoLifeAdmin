import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import * as types from '../actions/types';

//like this
const filter = (state = '', action) => {
    switch (action.type) {
        case types.FILTER:
            return action.filter;
        default:
            return state;
    }
};

import auth from '../reducers/auth'

const rootReducer = combineReducers({
    auth,
    routing
});

export default rootReducer;
