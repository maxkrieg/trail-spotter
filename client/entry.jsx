import 'babel-polyfill';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import promise from 'redux-promise';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import Search from './pages/Search';
import reducers from './reducers';

const logger = createLogger()
const createStoreWithMiddleware = applyMiddleware(
  thunk,
  promise,
  logger,
)(createStore);
const store = createStoreWithMiddleware(reducers);

ReactDOM.render(
  <Provider store={store}>
    <Search />
  </Provider>,
  document.getElementById('root'))
