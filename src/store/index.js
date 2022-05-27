import { createStore, applyMiddleware ,compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducer from '../reducers';
// import { composeWithDevTools } from 'redux-devtools-extension';

let store;

export function configureStore() {
  store = createStore(reducer, compose (applyMiddleware(thunk, logger),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

  return store;
}
