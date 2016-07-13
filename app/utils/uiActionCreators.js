export function clearErrors(){
  return {
    type: 'CLEAR_ERRORS',
  }
}

export function toggleFilters(){
  return {
    type: 'TOGGLE_FILTERS',
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
