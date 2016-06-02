import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import devTools from 'remote-redux-devtools';
import createSagaMiddleware from 'redux-saga'

import rootSaga from './app/utils/sagas'
import rootReducer from './app/rootReducer';

const initialState = {
  partners: [],
  auth: {
    loggedIn: false,
  },
  counter: 0
}

const sagaMiddleware = createSagaMiddleware()

export default function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(
      sagaMiddleware,
      thunk
    ),
    devTools(),
  );

  const _store = createStore(rootReducer, initialState, enhancer);
  return _store;
}

const store = configureStore(initialState);
sagaMiddleware.run(rootSaga)

export default store;
