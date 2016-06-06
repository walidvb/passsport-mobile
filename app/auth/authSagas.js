import { takeEvery} from 'redux-saga'
import { put, call } from 'redux-saga/effects'


import Api from '../Api'

function* signIn(action){
  let { user } = action;
  const userReturned = yield Api.signIn(user);

  if(userReturned.error){
    yield put({ type: 'SIGNED_IN_ERROR', errors: userReturned})
  }
  else{
    yield put({ type: 'SIGNED_IN_SUCCESSFUL', user: userReturned})
    const subs = yield Api.getSubscriptionDetails();
    yield put({ type: 'GET_SUBSCRIPTION' })
  }
}
export function* watchSignIn(){
  yield* takeEvery('SIGN_IN', signIn)
}

function* signUp(action){
  let { user, options } = action;
  const userReturned = yield Api.signUp(user, options);
  if(userReturned.errors){
    yield put({ type: 'SIGNED_UP_ERROR', errors: userReturned.errors})
  }
  else{
    yield put({ type: 'SIGNED_UP_SUCCESSFUL', user: userReturned})
  }
}
export function* watchSignUp(){
  yield* takeEvery('SIGN_UP', signUp)
}

function* signOut(action){
  let { user } = action;
  const response = yield Api.signOut(user)
  console.log(response);
  if(response){
    yield put({ type: 'SIGNED_OUT_FAILED'})
  }else{
    yield put({ type: 'SIGNED_OUT'})
  }
}
export function* watchSignOut(){
  yield* takeEvery('SIGN_OUT', signOut)
}


export default [watchSignIn(), watchSignUp(), watchSignOut()]
