
export function categoryClicked(cat, single = false){
  return {
    type: 'CATEGORY_CLICKED',
    cat,
    single
  }
}
