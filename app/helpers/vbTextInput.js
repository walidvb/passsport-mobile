import React, { Component } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import colors from '../colors'

const VbIcon = require('./vbIcon')

class VbTextInput extends Component{

  render() {
    return (
      <View style={styles.search}>
        <VbIcon name='search' style={{
          color: colors.lightGray,
          marginRight: 5,
          paddingBottom: 4
        }}/>
         <TextInput
          {...this.props}
          ref='search'
          placeholder='SEARCH'
          returnKeyType='done'
          clearButtonMode='always'
        style={[styles.underline, this.props.style]} autoCapitalize={'characters'} />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  search: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  underline: {
    height: 40,
    flex: 1,
  }
})

module.exports = VbTextInput
