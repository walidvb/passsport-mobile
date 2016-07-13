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
    default:
      return state;
  }
  return state;
}
