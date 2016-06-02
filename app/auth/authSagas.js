import { put, takeEvery} from 'redux-saga'
import Api from '../Api'

function* signIn(action){
  let { user } = action;
  console.log('user', user);
  const userResponse = yield Api.signIn(user);
  console.log(userResponse);
}

export default function* watchAuth(){
  yield* takeEvery('SIGN_IN', signIn)
}
