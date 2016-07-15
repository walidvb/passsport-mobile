import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
const HTMLView = require('react-native-htmlview')
var baseStyles = require('../styles')
var VbText = require('./vbText')
import colors from '../colors'

class VbHTMLView extends Component{
  renderNode(node, index, list){
    if(node.name == 'hr'){
      return (<View style={[{width: Dimensions.get('window').width/2}, styles.hr]}></View>)
    }
  }
  render() {

    return (
      <HTMLView
        value={this.props.value}
        stylesheet={this.props.stylesheet || styles}
        renderNode={this.renderNode}
      />
    );
  }
};


const styles = StyleSheet.create({
  a: {
    color: colors.brand,
  },
  hr: {
    flex: 1,
    height: 1,
    marginLeft: 15,
    marginRight: 15,
    borderBottomColor: colors.white,

    borderBottomWidth: 1,
  }
})
module.exports = VbHTMLView
