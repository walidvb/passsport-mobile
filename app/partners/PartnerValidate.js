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
const VbText = require('../helpers/vbText')
const VbButton = require('../helpers/vbButton')

class PartnerValidate extends Component{
  componentWillMount() {
  }
  renderOffline(){
    return (
      <View>
        <VbText text="Please give this code to the partner"/>
        <VbText uppercase text="Your Code"/>
        <VbText uppercase text={this.props.auth.user.token}/>
        <VbButton
          style={baseStyles.button}
          onPress={this.props.validatePartner.bind(this, this.props.partner)}>
          {"OK"}
        </VbButton>
      </View>
    )
  }
  render() {
    const { partner } = this.props;
    return this.renderOffline()

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
PartnerValidate = myConnector(PartnerValidate, partnersActionCreators, ['partners', 'auth']);

module.exports = PartnerValidate
