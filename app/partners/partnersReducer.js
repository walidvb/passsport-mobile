export default function partners(state = [], action){
  switch(action.type){
    case 'PARTNERS_FETCHED':
      if(action.status != 'failed'){
        return action.partners.sort(function(a, b) {
          const nameA = a.name.toUpperCase().trim(); // ignore upper and lowercase
          const nameB = b.name.toUpperCase().trim(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          // names must be equal
          return 0;
        });
      }
    default:
      return state;
  }
  return state;
}
