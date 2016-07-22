import { takeEvery} from 'redux-saga'
import { put, call } from 'redux-saga/effects'


import Api from '../Api'

function* getUserDetails(action){
  let { user } = action;
  const response = yield Api.getUser()
  console.log(response);
  if(response){
    yield put({ type: 'USER_FETCHED', ...response })
  }else{
    yield put({ type: 'USER_FETCHED_FAILED'})
  }
}
export function* watchGetUserDetails(){
  yield* takeEvery('GET_USER_DETAILS', getUserDetails)
}


function* signOut(action){
  let { user } = action;
  const response = yield Api.signOut(user)
  yield put({ type: 'SIGNED_OUT'})
}
export function* watchSignOut(){
  yield* takeEvery('SIGN_OUT', signOut)
}


export default [watchSignOut(), watchGetUserDetails()]
