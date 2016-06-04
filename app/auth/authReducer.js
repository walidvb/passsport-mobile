var ReactNative = require('react-native');
var { AsyncStorage } = ReactNative;

import Api from '../Api'

// a reducer takes in the action, and a copy of current state
export default function auth(state = [], action){
  switch(action.type){
    case 'SIGNED_IN_SUCCESSFUL':
      console.log('SIGNED_IN_SUCCESSFUL', action);
      Api.authToken =  action.user.auth_token;
      console.log('SIGNED_IN_SUCCESSFUL', Api.authToken);
      return {
        ...state,
        loggedIn: true,
        user: action.user
      }
    case 'SIGNED_OUT':
      Api.authToken =  null
      return {
        ...state,
        loggedIn: false,
        user: null
      }
    default:
      return state;
  }
  return state;
}
