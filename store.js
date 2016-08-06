import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import devTools from 'remote-redux-devtools';
import createSagaMiddleware from 'redux-saga'
import createLogger from 'redux-logger';

const {persistStore, autoRehydrate} = require('redux-persist');
const {AsyncStorage, NetInfo} = require('react-native');

import rootSaga from './app/utils/sagas'
import rootReducer from './app/rootReducer';


const initialState = {
  partners: [],
  auth: {
    user: null,
    loggedIn: false,
  },
  categories: [],
  subscription: {},
  ui: { auth: {}, partners: {}, errors: {}, filters: {
    search: '',
    categories: [],
    drawerOpen: false
  } }
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
    NetInfo.isConnected.fetch().done((isConnected) => {
      store.dispatch({type: 'GET_PARTNERS'});
      if(store.getState().auth.loggedIn){
        store.dispatch({type: 'GET_SUBSCRIPTION'})
        store.dispatch({type: 'GET_USER_DETAILS'})
      }
    })

  });

  return _store;
}

const store = configureStore(initialState);
store.runSaga = sagaMiddleware.run(rootSaga)

export default store;
