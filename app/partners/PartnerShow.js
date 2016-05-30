'use strict';
import React, { Component } from 'react';
import _ from 'lodash';

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
    console.log(this.props);
    const partner = _.find(this.props.partners, (p) => p.id === this.props.id)
    this.state = {
      partner,
    }
  }
  largeImgUrl(partner){
    partner.logo
  }
  render() {
    const { partner } = this.state;
    return(
      <View style={baseStyles.container}>
        <Image source={this.largeImgUrl(partner)}/>
        <Text>
          {partner.name}
        </Text>
        <Text>
          {partner.description}
          {this.props.counter}
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

import myConnector from '../utils/myConnector'
import * as partnersActionCreators from './partnersActionCreators';
PartnerShow = myConnector(PartnerShow, partnersActionCreators, ['partners']);

module.exports = PartnerShow
