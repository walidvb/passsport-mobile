export default function subscription(state = {}, action){
  switch(action.type){
    case 'SUBSCRIPTION_FETCHED':
    case 'SIGNED_UP_SUCCESSFUL':
      let { subscription } = action;
      console.log('subscription', subscription);
      console.log(state);
      return {
        ...subscription
      }
    case 'PARTNER_VALIDATED':
      validated_partner_ids = state.validated_partner_ids
      validated_partner_ids.push(action.validation.partner_id)
      return {
        ...state
      };
    default:
      return state;
  }
  return state;
}
