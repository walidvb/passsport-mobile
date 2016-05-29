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

var baseStyles = require('./styles')
import App from './components/App';
console.log('App', App);

class PassSport extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={[baseStyles.container, {paddingTop:20}]}>
          <App/>
        </View>
      </Provider>
    )
  }
}



AppRegistry.registerComponent('PassSport', () => PassSport);
