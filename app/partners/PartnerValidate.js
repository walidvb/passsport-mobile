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
var Button = require('react-native-button');


class PartnerValidate extends Component{
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
  render() {
    const { partner } = this.props;
    function validatePartner(){
      this.props.validatePartner(partner)
    }
    return(
      <View style={baseStyles.container}>
        <Button style={baseStyles.button} onPress={validatePartner.bind(this)}>
          Validate {partner.name}?
        </Button>
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
PartnerValidate = myConnector(PartnerValidate, partnersActionCreators, ['partners']);

module.exports = PartnerValidate
