/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Provider } from 'react-redux';
import store from './store';

import Main from './app/Main'

class PassSport extends Component {
  render() {
    return (
      <Provider store={store} style={{paddingTop: 20, backgroundColor: 'white'}}>
        <Main />
      </Provider>
    )
  }
}

AppRegistry.registerComponent('PassSport', () => PassSport);
