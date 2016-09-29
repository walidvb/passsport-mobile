import React, { Component } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import colors from '../colors'

const VbIcon = require('./vbIcon')

class VbTextInput extends Component{
  componentWillReceiveProps(props){
    if(!props.text.length){
      this.refs.search.clear(0);
    }
  }
  render() {
    return (
      <View style={styles.search}>
        <VbIcon name='search' style={{
          color: this.props.active ? colors.brand : colors.lightGray,
          marginRight: 5,
          paddingBottom: 4
        }}/>
         <TextInput
          {...this.props}
          ref='search'
          placeholder='RECHERCHER'
          returnKeyType='done'
          clearButtonMode='always'
          underlineColorAndroid='transparent'
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
