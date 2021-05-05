
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import rootReducer from './store';

export const middlewares = [ReduxThunk];

export default createStore(rootReducer, {}, applyMiddleware(...middlewares));