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
var PartnersList = require('./components/PartnersList');
var UserForm = require('./components/UserForm');
class PassSport extends Component {
  render() {
    return (
      <View style={[baseStyles.container, {paddingTop:20}]}>
        <UserForm/>
      </View>
    )
  }
}



AppRegistry.registerComponent('PassSport', () => PassSport);
