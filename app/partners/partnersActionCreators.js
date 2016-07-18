export function getPartners(){
  return {
    type: 'GET_PARTNERS',
  }
}

export function validatePartner(partner, partnerToken){
  return {
    type: 'VALIDATE_PARTNER',
    partner,
    partnerToken,
  }
}
