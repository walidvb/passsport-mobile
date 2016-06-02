import { delay } from 'redux-saga'


const url = (endpoint) => {
  const host = 'http://localhost:3000/';
  return host+endpoint;
}

function _prepBody(params = {}){
  console.log('params', params);
  return JSON.stringify({
    ...params,
    APP_TOKEN: 'sua-mae',
  })
}

function params(){
  return {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Origin': '',
      'X-APP-TOKEN': 'sua-mae',
      'X-AUTH-TOKEN': global.authToken
    }
  }
}

class Api{

  static getPartners(store) {
    console.log('global', global);
    return fetch(url('partners.json'), {
      ...params(),
    }).then((res) => res.json());
  }

  static signIn(user){
    return fetch(url('users/sign_in'),{
      ...params(),
      method: 'POST',
      body: _prepBody({user}),
    }).then((res) => res.json()).catch(() => {status: 'error'});
  }

  static signUp(user){
    return fetch(url('users/sign_in'),{
      ...params(),
      method: 'POST',
      body: _prepBody({user}),
    }).then((res) => res.json()).catch(() => {status: 'error'});
  }
}

module.exports = Api;
