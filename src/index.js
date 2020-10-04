import React from 'react'
import ReactDOM from 'react-dom'
import App from 'App'
import Root from 'Root'
import 'bootstrap/dist/js/bootstrap.js'

import 'bootstrap/dist/css/bootstrap.css'

ReactDOM.render(
  <React.StrictMode>
    <Root>
      <App />
    </Root>
  </React.StrictMode>,
  document.getElementById('root')
)
