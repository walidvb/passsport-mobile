'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
var baseStyles = require('../styles')


class PartnerShow extends Component{
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.state = {
      partner: {
        name: 'test'
      },
    }
  }
  componentDidMount() {
  }
  render() {
    return(
      <View style={baseStyles.container}>
        <Text>
          {this.state.partner.name}
        </Text>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  partnersList: {
  },
  partnerCell: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#0074D9',
  },
  thumbnail: {
    width: 30,
    height: 30,
    margin: 10,
  }
})
module.exports = PartnerShow
