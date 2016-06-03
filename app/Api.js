import { delay } from 'redux-saga'


const url = (endpoint) => {
  const host = 'http://localhost:3000/';
  return host+endpoint;
}

function _prepBody(params = {}){
  console.log('params', params);
  return JSON.stringify({
    ...params,
  })
}


class Api{
  static params ={
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-APP-TOKEN': 'sua-mae',
      'X-AUTH-TOKEN': Api.authToken
    }
  }

  static authKey = null

  static getPartners() {
    console.log('authKey', Api.authKey);
    return fetch(url('partners.json'), {
      ...Api.params,
    }).then((res) => res.json());
  }

  static validatePartner(partnerId){
    return fetch(url(`partners/${partnerId}/validations`), {
      ...Api.params,
      method: 'POST',
    })
  }

  static signIn(user){
    return fetch(url('users/sign_in'),{
      ...Api.params,
      method: 'POST',
      body: _prepBody({user}),
    }).then((res) => res.json()).catch(() => {status: 'error'});
  }

  static signUp(user){
    return fetch(url('users/sign_in'),{
      ...Api.params,
      method: 'POST',
      body: _prepBody({user}),
    }).then((res) => res.json()).catch(() => {status: 'error'});
  }
}

module.exports = Api;
