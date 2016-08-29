import { takeEvery, delay } from 'redux-saga'
import { put, call } from 'redux-saga/effects'
import { Actions } from 'react-native-router-flux';

import Api from '../Api'

export function* getPartners() {
  yield put({ type: 'FETCHING_PARTNERS' })
  try{
    const partners = yield call(Api.getPartners)
    yield put({ type: 'PARTNERS_FETCHED', status: 'success', partners: partners })
  }catch(e){
    console.log('PARTNERS_FETCHED failed', e);
  }
}
export function* watchFetchPartners(){
  yield* takeEvery('GET_PARTNERS', getPartners)
}


export function* validatePartner(action){
  let { partner, partnerToken } = action;
  yield put({ type: 'VALIDATING_PARTNER' })

  if(partner.token != partnerToken){
    yield put({ type: 'PARTNER_VALIDATED_ERROR', error: 'Oops, it seems you\'ve entered the wrong token. \n Please try again' })
  }
  else{
    try{
      const validation = yield call(Api.validatePartner, partner.id, partnerToken)
      if(validation.errors){
        yield put({ type: 'PARTNER_VALIDATED_ERROR', validation })
      }
      else{
        yield put({ type: 'PARTNER_VALIDATED', validation })
        // hopefully we're in a single view, so we can pop it back to the partner....
        Actions.pop()
      }
    }catch(e){
      console.log('PARTNER_VALIDATED failed', e);
      yield put({ type: 'PARTNERS_VALIDATED', status: 'failed'})
      yield Actions.pop()
    }
  }
}

export function* watchValidatePartners(){
  yield* takeEvery('VALIDATE_PARTNER', validatePartner)
}

export default [watchFetchPartners(), watchValidatePartners()]
