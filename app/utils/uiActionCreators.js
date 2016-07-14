export function clearErrors(){
  return {
    type: 'CLEAR_ERRORS',
  }
}

export function toggleFilters(toOpen){
  return {
    type: 'TOGGLE_FILTERS',
    toOpen: toOpen,
  }
}

export function toggleCategory(category){
  return {
    type: 'TOGGLE_CATEGORY',
    category
  }
}

export function searchPartners(query){
  return {
    type: 'SEARCH',
    query
  }
}
