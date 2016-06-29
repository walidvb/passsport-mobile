import React, { Component } from 'react';
import { View, TouchableHighlight, StyleSheet } from 'react-native';
var baseStyles = require('../styles')
var VbText = require('./vbText')
import colors from '../colors'

class VbButton extends Component{

  render() {
    return (
      <View style={[styles.button, styles[this.props.type]]}>
        <VbText text={this.props.children} light bold uppercase centered/>
      </View>
    );
  }
};

VbButton.defaultProps = {
  type: "main"
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    justifyContent: 'center',
    padding: 5,
  },
  main: {
    backgroundColor: colors.brand,
    borderColor: colors.brand,
  },
  buttonInner: {
    color: 'white',
    textAlign: 'center',
  },
  floatButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  }
})
module.exports = VbButton
