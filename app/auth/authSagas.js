import { takeEvery} from 'redux-saga'
import { put, call } from 'redux-saga/effects'


import Api from '../Api'

function* signIn(action){
  let { user } = action;
  const userReturned = yield Api.signIn(user);
  global._authToken = () => userReturned.auth_token
  console.log(userReturned);
  if(userReturned.error){
    yield put({ type: 'SIGNED_IN_ERROR', user: userReturned})
  }
  else{
    yield put({ type: 'SIGNED_IN_SUCCESSFUL', user: userReturned})
  }
}

export function* watchSignIn(){
  yield* takeEvery('SIGN_IN', signIn)
}

function* signOut(action){
  yield put({ type: 'SIGNED_OUT'})
}

export function* watchSignOut(){
  yield* takeEvery('SIGN_OUT', signOut)
}


export default [watchSignIn(), watchSignOut()]
