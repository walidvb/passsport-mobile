import { combineReducers } from 'redux';

import auth from './auth/authReducer.js'
import partners from './partners/partnersReducer.js'
import subscription from './subscriptions/subscriptionsReducer.js'

import { reducer as uiReducer } from 'redux-ui'

const rootReducer = combineReducers({ uiReducer, auth, subscription, partners })

module.exports = rootReducer;
