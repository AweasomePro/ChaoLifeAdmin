import {createStore, applyMiddleware, combineReducers} from 'redux';
import rootReducer from '../reducers';
import thunkMiddleware from 'redux-thunk';
import DevTools from '../containers/DevTools';
import promiseMiddleware from '../middlewares/promiseMiddleware'

const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    promiseMiddleware({promiseTypeSuffixes: ['PENDING', 'SUCCESS', 'ERROR']})
)(createStore);

export default function configureStore(initialState) {
    return createStoreWithMiddleware(rootReducer, initialState, DevTools.instrument());
}
