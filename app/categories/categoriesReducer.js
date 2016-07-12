export default function categories(state = {}, action){
  switch(action.type){
    case 'PARTNERS_FETCHED':
      console.log('asdsas', action);
      let categories = ['yes', 'no']
      return categories;
    default:
      return state;
  }
  return state;
}
