export default function categories(state = {}, action){
  switch(action.type){
    case 'PARTNERS_FETCHED':
      cats = new Set()
      action.partners.map((p) => {
        for(const cat of p.categories){
          if(cat.depth < 1){
            cats.add(cat.name)}
          }
        }
      )
      cats = Array.from(cats).sort()
      return [...cats];
    default:
      return state;
  }
  return state;
}
