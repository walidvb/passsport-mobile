import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import colors from '../colors'
class VbText extends Component{

  render() {
    const p = this.props;
    const color = p.brandColor ? colors.brand : (p.light ? 'white' : 'black');
    let { text } = this.props;
    text = text || '';
    if(p.uppercase){
      text = text.toUpperCase()
    }
    if(p.lowercase){
      text = text.toLowerCase()
    }
    const fontWeight = p.bold ? 'bold' : 'normal';

    return (
    	<Text
        {...this.props}
        style={[styles.base, p.style, {
          color: color,
          fontWeight: p.bold ? 'bold' : 'normal',
          textAlign: p.centered ? 'center' : 'left'
        }]}>
        {text}
      </Text>
    );
  }
};

const styles = StyleSheet.create({
  base: {

  }
})

module.exports = VbText
