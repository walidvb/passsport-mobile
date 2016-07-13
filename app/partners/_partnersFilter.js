var filter = function(partners, query, activeCats){
  if(!query.length && !activeCats.length){ return partners; }
  return partners.filter((partner) => {
    const partnerSearchables = partner.categories
    partnerSearchables.push(partner.name);
    return testPartner(partnerSearchables, query, activeCats)
  })
}

function testPartner(partnerSearchables, search, filters){
  let truthSearch, truthFilters;
  if(search.length){
    for(var i = 0; i < partnerSearchables.length; i++){
      if(fuzzysearch(search, partnerSearchables[i])){
        truthSearch = true;
        break;
      }
    }
  }
  else{
    truthSearch = true
  }
  if(filters.length){
    for(let i = 0; i < filters.length; i++){
      if(partnerSearchables.indexOf(filters[i]) > -1){
        truthFilters = true;
        break;
      }
    }
  }
  else{
    truthFilters = true;
  }
  return truthFilters && truthSearch;
}

export default function filterPartners(partners, filters){
  const { search, categories} = filters
  if(!search.length && !categories.length){ return partners; }
  return filter(partners, search, categories)

}
