import 'babel-polyfill';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import promise from 'redux-promise';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import App from './App'
import Home from './pages/Home'
import Search from './pages/Search';
import AllTrails from './pages/AllTrails'
import Trail from './pages/Trail'
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
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="search" component={Search} />
        <Route path="all-trails" component={AllTrails} />
        <Route path="trail/:trailId" component={Trail} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root'))
