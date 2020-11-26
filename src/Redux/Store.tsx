import {compose, applyMiddleware, createStore} from 'redux';

import thunk from 'redux-thunk';

import rootReducer from './RootReducer';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

export default store;
