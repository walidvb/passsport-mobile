export default function partners(state = [], action){
  switch(action.type){
    case 'PARTNERS_FETCHED':
      console.log(state, action);
      if(action.status != 'failed'){
        return action.partners
      }
    default:
      return state;
  }
  return state;
}
