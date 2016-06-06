// Sign in

export function signIn(user){
  return {
    type: 'SIGN_IN',
    user
  }
}
// Sign up
export function signUp(user, options = {}){
  return {
    type: 'SIGN_UP',
    user,
    options
  }
}

export function signOut(){
  return {
    type: 'SIGN_OUT',
  }
}
