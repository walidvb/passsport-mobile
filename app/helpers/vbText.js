import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import colors from '../colors'
class VbText extends Component{

  render() {
    let p = this.props;
    let { text } = this.props;
    text = text || '';
    if(p.uppercase){
      text = text.toUpperCase()
    }
    if(p.lowercase){
      text = text.toLowerCase()
    }
    const fontWeight = p.bold ? 'bold' : 'normal';
    let _styles = [styles.base, p.style]
    if(p.styles){
      for(let i = 0; i < p.styles.length; i++){
        _styles.push(styles[p.styles[i]])
      }
    }
    return (
    	<Text
        onPress={p.onPress}
        style={_styles}>
        {text}
      </Text>
    );
  }
};

const styles = StyleSheet.create({
  base: {
    color: colors.black,
    textAlign: 'left',
  },
  centered: {
    textAlign: 'center',
  },
  light: {
    color: colors.white
  },
  brand: {
    color: colors.brand
  },
  bold:{
    fontWeight: 'bold'
  },
  large: {
    fontSize: 23,
  },
  xlarge: {
    fontSize: 27,
  },
  error: {
    color: colors.error,
  }
})

module.exports = VbText
