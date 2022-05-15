import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import reducers from '../reducers/reducers';

const middleware = [reduxThunk];
const initialState = {};

const store = createStore(reducers, initialState, applyMiddleware(...middleware));

export default store;