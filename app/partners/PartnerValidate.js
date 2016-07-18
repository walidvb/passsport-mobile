'use strict';
import React, { Component } from 'react';
import _ from 'lodash';

import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
} from 'react-native';
var baseStyles = require('../styles')
const VbText = require('../helpers/vbText')
const VbTextInput = require('../helpers/vbTextInput')
const VbButton = require('../helpers/vbButton')

class PartnerValidate extends Component{
  constructor(props) {
    super(props)
    this.state = {
      partnerToken: ''
    }
  }
  renderOffline(){
    return (
      <View style={styles.container}>
        <VbText
          text="Please give this code to the partner"
          uppercase
          styles={['bold']}
          style={{
            marginBottom: 18*4,
          }}/>
        <VbText uppercase styles={['bold']} text="Your Code:" style={{marginBottom: 18*2}}/>
        <VbText uppercase text={this.props.auth.user.token} style={{marginBottom: 18*2}}/>
        <VbButton
          style={[baseStyles.button, {
            flex: 1
          }]}
          onPress={this.props.validatePartner.bind(this, this.props.partner)}>
          {"Validate"}
        </VbButton>
      </View>
    )
  }
  renderOnline(){
    const { ui } = this.props
    const error = ui.validationError ? <VbText text={ui.validationError} styles={['error', 'centered']}/> : null
    return (
      <View style={[styles.container]}>
        <VbText
          text="Please ask the partner to input his code"
          uppercase
          styles={['bold']}
          style={{
            marginBottom: 18*4,
          }}/>
        <VbText uppercase styles={['bold']} text="Partner's Code:" style={{marginBottom: 18*2}}/>
        {error}
        <VbTextInput
          uppercase
          autofocus
          style={{
            marginBottom: 18*2,
            textAlign: 'center',
          }} placeholder='XXXXX-XXXXX'
          ref='partnerToken'
          onChangeText={(val) => this.setState({ partnerToken: val})}
        />
        <VbButton
          style={[baseStyles.button, {
            flex: 1
          }]}
          disabled={this.state.partnerToken.length}
          onPress={this.props.validatePartner.bind(this, this.props.partner, this.state.partnerToken.toLowerCase())}>
          {"Validate"}
        </VbButton>
      </View>
    )
  }
  render() {
    const { partner } = this.props;
    return this.renderOnline()

  }
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 18*3,
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
})

import myConnector from '../utils/myConnector'
import * as partnersActionCreators from './partnersActionCreators';
PartnerValidate = myConnector(PartnerValidate, partnersActionCreators, ['partners', 'auth']);

module.exports = PartnerValidate
