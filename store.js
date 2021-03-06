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
  ui: {
    auth: {},
    partners: {},
    errors: {},
    filters: {
      search: '',
      categories: [],
      drawerOpen: false
    },
    online: false,
  }
}

const sagaMiddleware = createSagaMiddleware()
const logger = createLogger({
  collapsed: true,
  level: 'error',

});

function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(
      thunk,
      sagaMiddleware,
      //logger,
    ),
    autoRehydrate(),
    //devTools(),
  );

  const _store = createStore(rootReducer, initialState, enhancer);
  persistStore(_store, {
    storage: AsyncStorage,
    blacklist: ['ui'],
  }, storePersisted)

  return _store;
}

const storePersisted = () => {
  const handleFirstConnectivityChange = (status) => {
    store.dispatch({type: 'NETWORK_STATUS_CHANGE', status: status});
  }
  NetInfo.isConnected.addEventListener(
    'change',
    handleFirstConnectivityChange
  );
  NetInfo.isConnected.fetch().done((isConnected) => {
    handleFirstConnectivityChange(isConnected);
    store.dispatch({type: 'GET_PARTNERS'});
    if(store.getState().auth.loggedIn){
      store.dispatch({type: 'GET_SUBSCRIPTION'})
      store.dispatch({type: 'GET_USER_DETAILS'})
    }
  });
};

const store = configureStore(initialState);
store.runSaga = sagaMiddleware.run(rootSaga)

export default store;
