// a reducer takes in the action, and a copy of current state
export default function ui(state = {}, action){
  switch(action.type){
    case 'TOGGLE_FILTERS':
      const newState = action.toOpen || !state.filters.drawerOpen
      console.log('drawerOpen: ', newState);
      return {
        ...state,
        filters: {
          ...state.filters,
          drawerOpen: newState,
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
      case 'SEARCH':
        const { query } = action
        return {
          ...state,
          filters: {
            ...state.filters,
            search: query
          }
        }
    case 'PARTNER_VALIDATED_ERROR':
      return {
        ...state,
        errors: {
          validationError: action.error
        }
      }
    case 'CLEAR_ERRORS':
    return {
      ...state,
      errors: {}
    }
    default:
      return state;
  }
  return state;
}
