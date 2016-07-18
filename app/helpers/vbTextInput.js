import React, { Component } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import colors from '../colors'
class VbTextInput extends Component{

  render() {
    return (
      <TextInput {...this.props}
        style={[this.props.style]} autoCapitalize={'characters'} />
    );
  }
};

const styles = StyleSheet.create({
  underline: {
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
    height: 60,
  }
})

module.exports = VbTextInput
