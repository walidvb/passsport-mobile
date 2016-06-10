import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import devTools from 'remote-redux-devtools';
import createSagaMiddleware from 'redux-saga'

var {persistStore, autoRehydrate} = require('redux-persist');
var {AsyncStorage} = require('react-native');

import rootSaga from './app/utils/sagas'
import rootReducer from './app/rootReducer';

const initialState = {
  partners: [],
  auth: {
    user: null,
    loggedIn: false,
  },
  subscription: {
    isValid: () => false,
    isValidFor: (partner) => false,
  },
  ui: { auth: {}, partners: {} }
}

const sagaMiddleware = createSagaMiddleware()

export default function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(
      thunk,
      sagaMiddleware,
    ),
    autoRehydrate(),
    devTools(),
  );

  const _store = createStore(rootReducer, initialState, enhancer);
  persistStore(_store, {
    storage: AsyncStorage,
    blacklist: ['ui'],
  }, () => {
    console.log(_store);
    store.dispatch({type: 'GET_PARTNERS'});
    store.dispatch({type: 'GET_SUBSCRIPTION'})
  });

  return _store;
}

const store = configureStore(initialState);
store.runSaga = sagaMiddleware.run(rootSaga)

export default store;
