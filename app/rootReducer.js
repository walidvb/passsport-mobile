import { combineReducers } from 'redux';

import auth from './auth/authReducer.js'
import partners from './partners/partnersReducer.js'
const rootReducer = combineReducers({ auth, partners })

module.exports = rootReducer;
