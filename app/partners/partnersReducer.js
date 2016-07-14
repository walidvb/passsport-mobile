export default function partners(state = [], action){
  switch(action.type){
    case 'PARTNERS_FETCHED':
      if(action.status != 'failed'){
        return action.partners
      }
    case 'SUBSCRIPTION_CREATED':
    case 'SUBSCRIPTION_FETCHED':
      const validatedIds = action.subscription.validated_partner_ids

      console.log(validatedIds);
      if(!validatedIds.length){ return state }
      let partners = []
      for( const p of state){
        p.validated = validatedIds.includes(p.id)
         partners.push(p)
       }
       return partners
    default:
      return state;
  }
  return state;
}
