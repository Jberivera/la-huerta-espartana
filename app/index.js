import './main.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import firebaseMiddleware from './js/api';
import localStorageMiddleware from './js/localStorage';

// reducers
import reducers from './reducers';

const reducer = combineReducers(Object.assign({}, reducers, {
  routing: routerReducer
}));

const middlewares = [
  thunk,
  firebaseMiddleware,
  localStorageMiddleware
];

if (process.env.NODE_ENV === 'development') {
  const createLogger = require('redux-logger');
  middlewares.push(createLogger());
}

const store = createStore(
  reducer,
  applyMiddleware(...middlewares)
);

const history = syncHistoryWithStore(browserHistory, store);

// react components
import { Root, Home, Market, Cart } from './components';

const App = (props) => (
  <Provider store={ store }>
    <Router history={ history }>
      <Route path="/" component={ Root }>
        <IndexRoute component={ Home } />
        <Route path="/mercado" component={ Market } />
        <Route path="/carrito" component={ Cart } />
      </Route>
    </Router>
  </Provider>
);

ReactDOM.render(<App />, document.querySelector('#app'));

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('/sw.js', { 'scope': '/' }).then(function(registration) {
//     // Registration was successful
//     console.log('ServiceWorker registration successful with scope: ', registration.scope);
//   }).catch(function(err) {
//     // registration failed :(
//     console.log('ServiceWorker registration failed: ', err);
//   });
// }
