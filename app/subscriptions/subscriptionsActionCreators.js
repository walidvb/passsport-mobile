export function getSubscriptionDetails(){
  return {
    type: 'GET_SUBSCRIPTION',
  }
}

export function subscriptionFetched(sub){
  return {
    type: 'SUBSCRIPTION_FETCHED',
    subscription: sub
  }
}
