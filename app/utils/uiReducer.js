// a reducer takes in the action, and a copy of current state
export default function ui(state = {}, action){
  switch(action.type){
    case 'CLEAR_ERRORS':
      console.log('CLEAR_ERRORS');
      return {
        ...state,
        errors: null,
      }
    case 'SIGNED_IN_ERROR':
    case 'SIGNED_UP_ERROR':
    case 'PARTNER_VALIDATED_ERROR':
      console.log(action);
      return {
        ...state,
        errors: action.errors,
      }
    default:
      return state;
  }
  return state;
}
