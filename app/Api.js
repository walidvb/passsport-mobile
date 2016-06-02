import { delay } from 'redux-saga'



const url = (endpoint) => {
  const host = 'http://localhost:3000/';
  return host+endpoint;
}

const params = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Origin': '',
    'APP_TOKEN': 'sua-mae'
  }
}
class Api{

  static getPartners() {
    return fetch(url('partners.json')).then((res) => res.json());
  }

  static signIn(user){
    return fetch(url('users/sign_in'),{
      ...params,
      method: 'POST',
      body: JSON.stringify({user}),
    }).then((res) => res.json()).catch(() => {status: 'error'});
  }

  static signUp(user){
    return fetch(url('users/sign_in'),{
      ...params,
      method: 'POST',
      body: JSON.stringify({user}),
    }).then((res) => res.json()).catch(() => {status: 'error'});
  }
}

module.exports = Api;
