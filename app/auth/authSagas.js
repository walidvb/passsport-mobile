import { takeEvery} from 'redux-saga'
import { put, call } from 'redux-saga/effects'


import Api from '../Api'

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


export default [watchSignOut()]
