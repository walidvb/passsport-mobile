import { delay } from 'redux-saga'



const url = (endpoint) => {
  const host = 'http://localhost:3000/';
  return host+endpoint;
}

class Api{

  static getPartners() {
    return fetch(url('partners.json')).then((res) => res.json());
  }
}

module.exports = Api;
