import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import devTools from 'remote-redux-devtools';

import partners from './data/partners';

import rootReducer from './app/rootReducer';

const initialState = {
  partners,
  auth: {
    loggedIn: false,
    displaySignUpForm: true,
  }
}

export default function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(thunk),
    devTools()
  );
  // Note: passing enhancer as last argument requires redux@>=3.1.0
  return createStore(rootReducer, initialState, enhancer);
}

const store = configureStore(initialState);

export default store;
