const removeDiacritics = require('diacritics').remove;

const filter = (partners, query, activeCats) => {
  if(!query.length && !activeCats.length){ return partners; }
  return partners.filter((partner) => {
    const partnerSearchables = partner.categories.map((c) => removeDiacritics(c).toLowerCase())
    partnerSearchables.push(removeDiacritics(partner.name).toLowerCase());
    return testPartner(partnerSearchables, query, activeCats)
  })
}

function testPartner(partnerSearchables, search, filters){
  let truthSearch, truthFilters;
  if(search.length){
    for(var i = 0; i < partnerSearchables.length; i++){
      if(fuzzysearch(search.toLowerCase(), partnerSearchables[i])){
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

function fuzzysearch (needle, haystack) {
  var tlen = haystack.length;
  var qlen = needle.length;
  if (qlen > tlen) {
    return false;
  }
  if (qlen === tlen) {
    return needle === haystack;
  }
  outer: for (var i = 0, j = 0; i < qlen; i++) {
    var nch = needle.charCodeAt(i);
    while (j < tlen) {
      if (haystack.charCodeAt(j++) === nch) {
        continue outer;
      }
    }
    return false;
  }
  return true;
}
