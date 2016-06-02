import { takeEvery} from 'redux-saga'
import { put, call } from 'redux-saga/effects'


import Api from '../Api'

function* signIn(action){
  let { user } = action;
  const userReturned = yield Api.signIn(user);
  console.log(userReturned);
  if(userReturned.error){
    yield put({ type: 'SIGNED_IN_ERROR', user: userReturned})
  }
  else{
    yield put({ type: 'SIGNED_IN_SUCCESSFUL', user: userReturned})
  }
}

export default function* watchAuth(){
  yield* takeEvery('SIGN_IN', signIn)
}
