export default function partners(state = [], action){
  switch(action.type){
    case 'PARTNERS_FETCHED':
      console.log(state);
      return action.partners
    default:
      return state;
  }
  return state;
}
