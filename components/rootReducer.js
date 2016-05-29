import { combineReducers } from 'redux';

import auth from './auth/authReducer.js'
const partners = auth;

const rootReducer = combineReducers({ auth, partners })

module.exports = rootReducer;
