import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import reduxThunk from 'redux-thunk';

import { AUTH_USER } from './actions/types';

import reducers from './reducers';

import App from './components/app';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token'); // if token then user is signed in!

if(token){
	// we need to update application state...
	store.dispatch({
		type: AUTH_USER,
	})
}

ReactDOM.render(
  <Provider store={ store }>
    <BrowserRouter>
    	<Route path="/" component={App} />
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
