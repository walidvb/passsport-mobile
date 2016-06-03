export function getPartners(){
  return {
    type: 'GET_PARTNERS',
  }
}

export function validatePartner(partner){
  return {
    type: 'VALIDATE_PARTNER',
    partner
  }
}
