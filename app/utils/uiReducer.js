// a reducer takes in the action, and a copy of current state
export default function ui(state = {}, action){
  switch(action.type){
    case 'TOGGLE_FILTERS':
      console.log(state.filters);
      return {
        ...state,
        filters: {
          ...state.filters,
          drawerOpen: !state.filters.drawerOpen,
        },
      }
    case 'TOGGLE_CATEGORY':
      let { categories } = state.filters
      const { category } = action
      if(categories.includes(category)){
        categories.splice(categories.indexOf(category), 1)
      }
      else{
        categories.push(category)
      }
      return {
        ...state,
        filters: {
          ...state.filters,
          categories
        }
      }
    default:
      return state;
  }
  return state;
}
