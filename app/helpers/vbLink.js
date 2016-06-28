'use strict';
import React, { Component } from 'react';
import {
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

const VbText = require('./vbText')

class VbLink extends Component{

  handleClick() {
    Linking.canOpenURL(this.props.url).then((supported) => {
      if (supported) {
        Linking.openURL(this.props.url);
      } else {
        console.log('Don\'t know how to open URI: ' + this.props.url);
      }
    });
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.handleClick.bind(this)}>
        <View>
          <VbText link text={this.props.children}></VbText>
        </View>
      </TouchableOpacity>
    );
  }
};

module.exports = VbLink;