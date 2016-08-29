import React, { Component } from 'react';
import { View, TouchableHighlight, StyleSheet } from 'react-native';
var baseStyles = require('../styles')
var VbText = require('./vbText')
import colors from '../colors'

class VbButton extends Component{
  setNativeProps(nativeProps) {
    this._root.setNativeProps(nativeProps);
  }
  render() {
    const _styles = [styles.button, styles[this.props.type]];
    if(this.props.float){
      _styles.push(styles.floatButton)
    }

    return (
      <TouchableHighlight
        onPress={this.props.onPress}
        style={_styles}
        underlayColor={colors.brand}
        >
        <View ref={(component) => this._root = component}>
          <VbText text={this.props.children} styles={['light', 'bold', 'centered']} uppercase/>
          </View>
      </TouchableHighlight>
    );
  }
};

VbButton.defaultProps = {
  type: "main"
};

const styles = StyleSheet.create({
  button: {
    alignSelf: 'stretch',
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
