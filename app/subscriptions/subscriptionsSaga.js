import { takeEvery, delay } from 'redux-saga'
import { put, call } from 'redux-saga/effects'

import Api from '../Api'

export function* getSubscription() {
  yield put({ type: 'FETCHING_SUBSCRIPTION' })
  try{
    const subscription = yield call(Api.getSubscriptionDetails)
    yield put({ type: 'SUBSCRIPTION_FETCHED', status: 'success', subscription })
  }catch(e){
    yield put({ type: 'SUBSCRIPTION_FETCHED_FAILED', status: 'failed'})
  }
}
export function* watchFetchSubscription(){
  yield* takeEvery('GET_SUBSCRIPTION', getSubscription)
}


export default [watchFetchSubscription()]
