import { createStore } from 'redux';
import rootReducer from './components/rootReducer'

const defaultState = {
  auth: {
    loggedIn: false
  }
}

const store = createStore(rootReducer, defaultState);

export default store;
