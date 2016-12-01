import {createStore, applyMiddleware, combineReducers} from 'redux';
import rootReducer from '../reducers';
import thunkMiddleware from 'redux-thunk';
import DevTools from '../containers/DevTools';

const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
)(createStore);

export default function configureStore(initialState) {
    return createStoreWithMiddleware(rootReducer, initialState, DevTools.instrument());
}
