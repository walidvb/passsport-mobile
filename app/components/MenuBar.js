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
      <View style={[styles.container, this.props.style]}>
        <VbIcon
          size={27}
          style={[styles.icon, {color: colors.white}]}
          name='bars'
          onPress={this.props.toggleFilters}/>
        <Image
          resizeMode='contain'
          style={{height: 40, flex: 1,}}
          source={require('../resources/images/logo.png')}></Image>
        <VbIcon size={27} style={[styles.icon, {color: colors.white, marginRight: 15}]} name='ellipsis-v'/>
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
