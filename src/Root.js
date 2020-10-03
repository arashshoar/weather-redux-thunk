import React from 'react'
import { Provider } from 'react-redux'
import store from 'store/createStore'

const Root = ({ children }) => (
  <Provider store={store}>
    {children}
  </Provider>
)

export default Root
