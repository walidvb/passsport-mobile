import { takeEvery, delay } from 'redux-saga'
import { put, call } from 'redux-saga/effects'

import Api from '../Api'

export function* getPartners() {
  yield put({ type: 'FETCHING_PARTNERS' })
  try{
    const partners = yield call(Api.getPartners)
    yield put({ type: 'PARTNERS_FETCHED', status: 'success', partners: partners })
  }catch(e){
    console.log('PARTNERS_FETCHED failed', e);
    yield put({ type: 'PARTNERS_FETCHED', status: 'failed'})
  }
  console.log('getPartners finished');
}

export function* watchPartners(){
  yield* takeEvery('GET_PARTNERS', getPartners)
}

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield [
    watchPartners()
  ]
}
