// Sign in

export function signIn(user){
  return {
    type: 'SIGN_IN',
    user
  }
}
// Sign up
export function signUp(email, password, passwordConfirmation){
  return {
    type: 'SIGN_UP',
    email,
    password,
    passwordConfirmation
  }
}
