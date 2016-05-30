// a reducer takes in the action, and a copy of current state

export default function auth(state = [], action){

  console.log('state from auth', state, action);
  console.log('action', action);
  switch(action.type){
    case 'SIGN_IN':
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
