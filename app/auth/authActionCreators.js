// Sign in

export function signIn(data){
  return {
    type: 'SIGN_IN',
    data
  }
}
// Sign up
export function signUp(user, subscription = {}){
  return {
    type: 'SIGNED_UP_SUCCESSFUL',
    user,
    subscription
  }
}

export function signOut(){
  return {
    type: 'SIGN_OUT',
  }
}
