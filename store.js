import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import devTools from 'remote-redux-devtools';
import createSagaMiddleware from 'redux-saga'
import createLogger from 'redux-logger';

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
const logger = createLogger({
  collapsed: true
});

export default function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(
      thunk,
      sagaMiddleware,
      logger,
    ),
    autoRehydrate(),
    devTools(),
  );

  const _store = createStore(rootReducer, initialState, enhancer);
  persistStore(_store, {
    storage: AsyncStorage,
    blacklist: ['ui'],
  }, () => {
    store.dispatch({type: 'GET_PARTNERS'});
    store.dispatch({type: 'GET_SUBSCRIPTION'})
    store.dispatch({type: 'GET_USER_DETAILS'})
  });

  return _store;
}

const store = configureStore(initialState);
store.runSaga = sagaMiddleware.run(rootSaga)

export default store;
