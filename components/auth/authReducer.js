// a reducer takes in the action, and a copy of current state

export default function auth(state = {}, action){
  console.log(state, action);
  switch(action.type){
    case 'SIGN_UP':

    default:
    return state;
  }
  return state;
}
