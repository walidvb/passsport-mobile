import { delay } from 'redux-saga'


const url = (endpoint) => {
  const host = 'https://passsport.herokuapp.com/';
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

  // PARTNERS
  static getPartners() {
    return fetch(url('partners.json'), {
      ...Api.params(),
    }).then((res) => res.json());
  }

  static validatePartner(partnerId){
    return fetch(url(`partners/${partnerId}/validations`), {
      ...Api.params(),
      method: 'POST',
    }).then(res => res.json()).then(b => b);
  }

  // SUBSCRIPTION
  static getSubscriptionDetails(){
    return fetch(url('subscription.json'), {
      ...Api.params(),
    }).then((res) => res.json());
  }

  // AUTH
  static signIn(user){
    return fetch(url('users/sign_in'),{
      ...Api.params(),
      method: 'POST',
      body: _prepBody({user}),
    }).then((res) => res.json()).catch(() => {status: 'error'});
  }

  static signUp(user, options){
    const { discount_token } = options;
    return fetch(url('users'),{
      ...Api.params(),
      method: 'POST',
      body: _prepBody({user, discount_token}),
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
