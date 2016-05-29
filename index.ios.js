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

import App from './components/App';
import Main from './components/Main';
import PartnersList from './components/partners/PartnersList';

class PassSport extends Component {
  render() {
    return (
      <Provider store={store}>
        <App>
          <Main>
          </Main>
        </App>
      </Provider>
    )
  }
}



AppRegistry.registerComponent('PassSport', () => PassSport);
