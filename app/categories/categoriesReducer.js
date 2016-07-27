export default function categories(state = {}, action){
  switch(action.type){
    case 'PARTNERS_FETCHED':
      cats = new Set()
      action.partners.map((p) => cats.add(...p.categories.map((c)=>c.name)))
      cats = Array.from(cats).filter((c) => !c.children_count).sort()
      return [...cats];
    default:
      return state;
  }
  return state;
}
