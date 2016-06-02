// a reducer takes in the action, and a copy of current state

export default function auth(state = [], action){
  switch(action.type){
    case 'SIGNED_IN_SUCCESSFUL':
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
