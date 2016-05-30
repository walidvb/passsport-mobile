/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Provider } from 'react-redux';
import store from './store';

import App from './app/App';
import Main from './app/Main';
import PartnersList from './app/partners/PartnersList';

class PassSport extends Component {
  render() {
    return (
      <Provider store={store}>
        <App>
          <Main/>
        </App>
      </Provider>
    )
  }
}



AppRegistry.registerComponent('PassSport', () => PassSport);
