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

var baseStyles = require('./styles')
var PartnersList = require('./components/PartnersList');

class PassSport extends Component {
  render() {
    return (
      <View style={baseStyles.container}>
        <PartnersList style={[baseStyles.container]}></PartnersList>
      </View>
    );
  }
}



AppRegistry.registerComponent('PassSport', () => PassSport);
