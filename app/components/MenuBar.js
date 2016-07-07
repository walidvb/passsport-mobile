/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
const VbIcon = require('../helpers/vbIcon')

import colors from '../colors';

class MenuBar extends Component {
  render() {
    return (
      <View style={styles.container}>
        <VbIcon size={32} style={[styles.icon, {color: colors.white}]} name='bars'/>
        <Image
          resizeMode='contain'
          style={{height: 60, flex: 1,}}
          source={require('../resources/images/logo.png')}></Image>
        <VbIcon size={32} style={[styles.icon, {color: colors.white}]} name='ellipsis-v'/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: colors.brand,
  },
  icon: {
    paddingLeft: 25,
    paddingRight: 25,
  }
});

module.exports = MenuBar
