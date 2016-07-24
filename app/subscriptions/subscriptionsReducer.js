import { Actions } from 'react-native-router-flux';

export default function subscription(state = {}, action){
  switch(action.type){
    case 'USER_FETCHED':
    case 'SUBSCRIPTION_FETCHED':
    case 'SUBSCRIPTION_CREATED':
    case 'SIGNED_UP_SUCCESSFUL':
    case 'SIGNED_IN_SUCCESSFUL':
      let { subscription } = action;
      return {
        ...subscription
      }
    case 'PARTNER_VALIDATED':
      validated_partner_ids = state.validated_partner_ids
      validated_partner_ids.push(action.validation.partner_id)
      return {
        ...state,
        validated_partner_ids: validated_partner_ids
      };
    case 'SIGNED_OUT':
      return {}
    default:
      return state;
  }
  return state;
}
