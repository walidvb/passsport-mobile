import { Actions } from 'react-native-router-flux';

export default function subscription(state = {}, action){
  switch(action.type){
    case 'SUBSCRIPTION_FETCHED':
      let { subscription } = action;
      if(subscription){
        subscription.isValid = () => {
          const now = new Date();
          const expires = new Date(subscription.expires_at);
          return (now <= expires)
        }
        subscription.isValidFor = (partner) => {
          return subscription.validated_partner_ids.indexOf(partner.id) < 0
        }
      }
      return subscription
    case 'PARTNER_VALIDATED':
      validated_partner_ids = state.validated_partner_ids
      validated_partner_ids.push(action.validation.partner_id)
      Actions.pop()
      return {
        ...state
      };
    default:
      return state;
  }
  return state;
}
