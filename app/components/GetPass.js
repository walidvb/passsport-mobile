import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
var baseStyles = require('../styles')
var VbText = require('../helpers/vbText')
var VbButton = require('../helpers/vbButton')

class GetPass extends Component{


  render() {
    return (
    	<View style={baseStyles.floatButton}>
        <VbButton style={baseStyles.button}>Get Pass</VbButton>
    	</View>
    );
  }
};

const styles = StyleSheet.create({

})

module.exports = GetPass
