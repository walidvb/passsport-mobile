export default function partners(state = [], action){
  switch(action.type){
    case 'PARTNERS_FETCHED':
      if(action.status != 'failed'){
        return action.partners
      }
    default:
      return state;
  }
  return state;
}
