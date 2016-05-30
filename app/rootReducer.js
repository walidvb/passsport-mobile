import { combineReducers } from 'redux';

import auth from './auth/authReducer.js'
import partners from './partners/partnersReducer.js'
import counter from './partners/partnersReducer.js'

const rootReducer = combineReducers({ auth, partners, counter })

module.exports = rootReducer;
