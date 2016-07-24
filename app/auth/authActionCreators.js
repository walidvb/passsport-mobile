export function getUserDetails(){
  return {
    type: 'GET_USER_DETAILS',
  }
}


// Sign in

export function signIn(user, options){
  return {
    type: 'SIGNED_IN_SUCCESSFUL',
    user,
    options
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


export function signOut(user){
  return {
    type: 'SIGN_OUT',
    user,
  }
}
