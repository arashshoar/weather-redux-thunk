import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'

import rootReducers from 'reducers/rootReducers'
import { storeStateIint } from 'utilities/test-utilities/mockData/storeStateInit'

const enhancer = composeWithDevTools(
  process.env.NODE_ENV === 'development' ? applyMiddleware(thunk, logger) : applyMiddleware(thunk) ,
)

const store = createStore(rootReducers, storeStateIint, enhancer)

export default store
