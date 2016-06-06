import { delay } from 'redux-saga'


const url = (endpoint) => {
  const host = 'http://localhost:3000/';
  return host+endpoint;
}

function _prepBody(params = {}){
  return JSON.stringify({
    ...params,
  })
}

let _auth_token = null
import store from '../store';

class Api{
  static params() {
    const state = store.getState();
    var auth_token = state.auth.user ? state.auth.user.auth_token : null;
    return {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-APP-TOKEN': 'sua-mae',
        'X-AUTH-TOKEN': auth_token,
      }
    }
  }


  static getPartners() {
    return fetch(url('partners.json'), {
      ...Api.params(),
    }).then((res) => res.json());
  }

  static validatePartner(partnerId){
    console.log('auth_token', Api.params());
    return fetch(url(`partners/${partnerId}/validations`), {
      ...Api.params(),
      method: 'POST',
    })
  }

  static signIn(user){
    return fetch(url('users/sign_in'),{
      ...Api.params(),
      method: 'POST',
      body: _prepBody({user}),
    }).then((res) => res.json()).catch(() => {status: 'error'});
  }

  static signUp(user){
    console.log(user);
    return fetch(url('users'),{
      ...Api.params(),
      method: 'POST',
      body: _prepBody({user}),
    }).then((res) => res.json()).catch(() => {status: 'error'});
  }

  static signOut(user){
    return fetch(url('users/sign_out'),{
      ...Api.params(),
      method: 'DELETE',
    }).then((res) => res.json()).catch(() => {status: 'error'});
  }
}

module.exports = Api;
