import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducers from 'reducers/rootReducers'
import { currentWeatherData } from 'utilities/test-utilities/mockData/currentWeatherData'

const enhancer = composeWithDevTools(
  applyMiddleware(thunk, logger),
)

const initialState = {
  currentWeatherData: currentWeatherData.data.currentWeatherData
};

const store = createStore(rootReducers, initialState, enhancer)

export default store
