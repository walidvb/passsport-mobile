import { Actions } from 'react-native-router-flux';
var Fabric = require('react-native-fabric');
var { Answers } = Fabric;

export default function subscription(state = {}, action){
  switch(action.type){
    case 'SUBSCRIPTION_CREATED':
      Answers.logPurchase(85,'CHF',true, 'Year', 'Subscription', action.subscription.id);
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
      Answers.logCustom('Validated Partner', { ...action.validation})
      return {
        ...state,
        validated_partner_ids: validated_partner_ids
      };
    case 'SIGNED_OUT':
      return {
        validated_partner_ids: []
      }
    default:
      return state;
  }
  return state;
}
