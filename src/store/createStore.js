import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootSaga from '../sagas/rootSaga'

import rootReducers from 'reducers/rootReducers'
import { storeStateIint } from 'utilities/test-utilities/mockData/storeStateInit'


const sagaMiddleware = createSagaMiddleware()

const enhancer = composeWithDevTools(
  process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test' ? applyMiddleware(thunk, logger, sagaMiddleware) : applyMiddleware(thunk, sagaMiddleware)
)

const store = createStore(rootReducers, storeStateIint, enhancer)

sagaMiddleware.run(rootSaga)

export default store
