export function getUserDetails(){
  return {
    type: 'GET_USER_DETAILS',
  }
}


// Sign in

export function signIn(data){
  return {
    type: 'SIGN_IN',
    data
  }
}
// Sign up
export function signUp(user, options = {}){
  return {
    type: 'SIGNED_UP_SUCCESSFUL',
    user,
    options
  }
}

// Sign up
export function userFetched(user, options = {}){
  return {
    type: 'SIGNED_IN_SUCCESSFUL',
    user,
    options,
  }
}


export function signOut(){
  return {
    type: 'SIGN_OUT',
  }
}
