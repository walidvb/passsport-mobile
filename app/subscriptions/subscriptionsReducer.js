export default function subscription(state = {}, action){
  switch(action.type){
    case 'SUBSCRIPTION_FETCHED':
      let { subscription } = action;
      if(subscription){
        subscription.isValid = () => {
          console.log(new Date(subscription.expires_at));
          console.log(new Date());
          console.log(new Date() <= new Date(subscription.expires_at));
          const now = new Date();
          const expires = new Date(subscription.expires_at);
          return (now <= expires)
        }
      }
      return subscription
    default:
      return state;
  }
  return state;
}
