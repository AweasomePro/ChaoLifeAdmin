import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

import admin from '../reducers/admin'

const rootReducer = combineReducers({
    admin,
    routing
});

export default rootReducer;
