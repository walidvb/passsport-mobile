// Sign in

export function signIn(user){
  return {
    type: 'SIGN_IN',
    user
  }
}
// Sign up
export function signUp(user){
  return {
    type: 'SIGN_UP',
    user
  }
}
