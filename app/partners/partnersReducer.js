export default function partners(state = [], action){
  switch(action.type){
    case 'PARTNERS_FETCHED':
      console.log(action);
      if(action.status != 'error'){
        console.log('PARTNERS_FETCHED', action.partners.length);
        return action.partners
      }
    default:
      return state;
  }
  return state;
}
