import { combineReducers } from 'redux';

import auth from './auth/authReducer.js'
import partners from './partners/partnersReducer.js'
import subscription from './subscriptions/subscriptionsReducer.js'

import ui from './utils/uiReducer.js'

const rootReducer = combineReducers({ ui, auth, subscription, partners })

module.exports = rootReducer;
