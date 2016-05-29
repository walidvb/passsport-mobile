import { combineReducers } from 'redux';

import auth from './auth/authReducer.js'

const rootReducer = combineReducers({ auth })

module.exports = rootReducer;
