import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';

class VbText extends Component{

  render() {
    const p = this.props;
    const color = p.light ? 'white' : 'black';
    let { text } = this.props;
    if(p.uppercase){
      text = text.toUpperCase()
    }
    if(p.lowercase){
      text = text.toLowerCase()
    }
    const fontWeight = p.bold ? 'bold' : 'normal';

    return (
    	<Text style={[styles.base, this.props.style], {color: color, fontWeight: fontWeight}}>
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