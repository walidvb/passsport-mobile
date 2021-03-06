var ReactNative = require('react-native');
var { AsyncStorage } = ReactNative;

const Fabric = require('react-native-fabric');
const { Crashlytics } = Fabric;
var { Answers } = Fabric;

import Api from '../Api'

// a reducer takes in the action, and a copy of current state
export default function auth(state = [], action){
  switch(action.type){
    case 'SIGNED_IN_SUCCESSFUL':
    case 'SIGNED_UP_SUCCESSFUL':
    case 'USER_FETCHED':
      try{
        const { user } = action
        Crashlytics.setUserIdentifier(`${user.id}`);
        Crashlytics.setUserEmail(user.email);
        Crashlytics.setUserName(user.name);
      } catch(e){
        console.log('Error Crashalyticising: ', e);
      }
    case 'SIGNED_IN_SUCCESSFUL':
      Answers.logLogin('EMAIL', true);
    case 'SIGNED_UP_SUCCESSFUL':
      Answers.logSignUp('EMAIL', true);


    case 'USER_FETCHED':
      return {
        ...state,
        loggedIn: true,
        user: action.user,
      }
    case 'SIGNED_IN_SUCCESSFUL':
    case 'SIGNED_UP_SUCCESSFUL':
      return {
        ...state,
        loggedIn: true,
        user: action.user,
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
