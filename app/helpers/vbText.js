import React, { Component, PropTypes } from 'react';
import { Text, StyleSheet, Platform } from 'react-native';
import colors from '../colors'


class VbText extends Component{
  render() {
    let props = this.props;
    let { text, numberOfLines } = this.props;
    text = text || '';
    if(props.uppercase){
      text = text.toUpperCase()
    }
    if(props.lowercase){
      text = text.toLowerCase()
    }
    const fontWeight = props.bold ? 'bold' : 'normal';
    let _styles = [styles.base, props.style]
    if(props.styles){
      for(let i = 0; i < props.styles.length; i++){
        _styles.push(styles[props.styles[i]])
      }
    }
    return (
    	<Text
        onPress={props.onPress}
        style={_styles}
        numberOfLines={numberOfLines}
      >
        {text}
      </Text>
    );
  }
};

const styles = StyleSheet.create({
  base: {
    color: colors.black,
    textAlign: 'left',
    fontFamily: 'Lato',
  },
  centered: {
    textAlign: 'center',
  },
  light: {
    color: colors.white,
  },
  brand: {
    color: colors.brand
  },
  bold:{
    fontFamily: 'LatoBold',
  },
  large: {
    fontSize: 23,
  },
  xlarge: {
    fontSize: 27,
  },
  error: {
    color: colors.error,
  },
  underlined: {
    textDecorationLine: 'underline',
  }
})

module.exports = VbText
