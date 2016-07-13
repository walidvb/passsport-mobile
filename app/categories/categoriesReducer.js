export default function categories(state = {}, action){
  switch(action.type){
    case 'PARTNERS_FETCHED':
      cats = []
      action.partners.map((p) => cats.push(...p.categories))
      return [...new Set(cats)];
    default:
      return state;
  }
  return state;
}
