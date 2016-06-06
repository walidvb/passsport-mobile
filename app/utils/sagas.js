import authWatchers from '../auth/authSagas'
import partnerWatchers from '../partners/partnerSagas'
import subscriptionWatchers from '../subscriptions/subscriptionsSaga'

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield Array().concat(authWatchers, partnerWatchers, subscriptionWatchers)
}
