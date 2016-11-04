'use strict';
import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import Search from './pages/Search';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import promise from 'redux-promise';

const logger = createLogger()
const createStoreWithMiddleware = applyMiddleware(
  thunk,
  promise,
  logger
)(createStore);
const store = createStoreWithMiddleware(reducers);

ReactDOM.render(
  <Provider store={store}>
    <Search />
  </Provider>,
  document.getElementById('root')
);
