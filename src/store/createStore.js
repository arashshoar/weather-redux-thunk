import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducers from 'reducers/rootReducers';

const enhancer = composeWithDevTools(
  applyMiddleware(thunk, logger),
);

const initialState = {hello: 'Salam'};

const store = createStore(rootReducers, initialState, enhancer);

export default store;
