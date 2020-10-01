import React from 'react';
import ReactDOM from 'react-dom';
import App from 'App';
import Root from 'Root';

import store from 'store/createStore';

ReactDOM.render(
  <React.StrictMode>
    <Root>
      <App />
    </Root>
  </React.StrictMode>,
  document.getElementById('root')
);
