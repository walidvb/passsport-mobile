import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
const HTMLView = require('react-native-htmlview')
var baseStyles = require('../styles')
var VbText = require('./vbText')
import colors from '../colors'

class VbHTMLView extends Component{
  renderNode(node, index, list){
    if(node.name == 'hr'){
      return null
      return (<Text style={[{width: Dimensions.get('window').width}, styles.hr]}>{"\n"}</Text>)
    }
  }
  render() {
    const wrapper = `<div>${this.props.value}</div>`
    return (
      <HTMLView
        value={wrapper}
        stylesheet={this.props.stylesheet || styles}
        renderNode={this.renderNode}
      />
    );
  }
};


const styles = StyleSheet.create({
  p: {
    fontFamily: 'Lato',
    color: colors.black,
  },
  li: {
    fontFamily: 'Lato',
    color: colors.black,
  },
  a: {
    color: colors.brand,
  },
  hr: {
    height: 1,
    marginLeft: 15,
    marginRight: 15,
    borderBottomColor: colors.white,
    borderBottomWidth: 1,
  },
  em: {
    fontFamily: 'Lato',
    fontStyle: 'italic',
    color: colors.black,
  }
})
module.exports = VbHTMLView
