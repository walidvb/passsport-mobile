import { takeEvery, delay } from 'redux-saga'
import { put, call } from 'redux-saga/effects'

import Api from '../Api'

export function* getPartners(asd) {
  console.log('as', asd);
  yield put({ type: 'FETCHING_PARTNERS' })
  try{
    const partners = yield call(Api.getPartners)
    yield put({ type: 'PARTNERS_FETCHED', status: 'success', partners: partners })
  }catch(e){
    console.log('PARTNERS_FETCHED failed', e);
    yield put({ type: 'PARTNERS_FETCHED', status: 'failed'})
  }
}
export function* watchFetchPartners(){
  yield* takeEvery('GET_PARTNERS', getPartners)
}


export function* validatePartner(action){
  let { partner } = action;
  yield put({ type: 'VALIDATING_PARTNER'})
  try{
    const validation = yield call(Api.validatePartner, partner.id)
    console.log(validation, 'validation');
    if(validation.errors){
      yield put({ type: 'PARTNER_VALIDATED_ERROR', validation })
    }
    else{
      yield put({ type: 'PARTNER_VALIDATED', validation })
    }
  }catch(e){
    console.log('PARTNERS_VALIDATED failed', e);
    yield put({ type: 'PARTNERS_VALIDATED', status: 'failed'})
  }
}

export function* watchValidatePartners(){
  yield* takeEvery('VALIDATE_PARTNER', validatePartner)
}

export default [watchFetchPartners(), watchValidatePartners()]
