var ReactNative = require('react-native');
var { AsyncStorage } = ReactNative;

// a reducer takes in the action, and a copy of current state
export default function auth(state = [], action){
  switch(action.type){
    case 'SIGNED_IN_SUCCESSFUL':
      console.log('SIGNED_IN_SUCCESSFUL', action);
      global.authToken =  action.user.auth_token;
      AsyncStorage.setItem('authToken', global.authToken)

      return {
        ...state,
        loggedIn: true,
        user: action.user
      }
    default:
      return state;
  }
  return state;
}
