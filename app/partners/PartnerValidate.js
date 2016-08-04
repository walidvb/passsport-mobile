'use strict';
import React, { Component } from 'react';
import _ from 'lodash';
import RequiresConnection from 'react-native-offline-mode';

import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Navigator,
} from 'react-native';
var baseStyles = require('../styles')
const VbText = require('../helpers/vbText')
const VbTextInput = require('../helpers/vbTextInput')
const VbButton = require('../helpers/vbButton')

class PartnerValidateOnline extends Component{
  constructor(props) {
    super(props)
    this.state = {
      partnerToken: ''
    }
    console.log(props.partner.token);
  }
  componentWillUnmount(){
    this.props.clearErrors()
  }
  render(){
    const { errors } = this.props.ui
    const error = errors.validationError ? <VbText text={errors.validationError} styles={['error', 'centered']}/> : null
    return (
      <View style={[styles.container, {marginTop: Navigator.NavigationBar.Styles.General.TotalNavHeight}]}>
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
          onChangeText={this.onChangeText.bind(this)}
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
  onChangeText(val){
    this.setState({ partnerToken: val})
  }
};

class PartnerValidateOffline extends Component{
  constructor(props) {
    super(props)
    this.state = {
      partnerToken: ''
    }
    console.log(props.partner.token);
  }
  componentWillUnmount(){
    this.props.clearErrors()
  }
  render(){
    const { partner } = this.props;
    return (
      <View style={[styles.container, {marginTop: Navigator.NavigationBar.Styles.General.TotalNavHeight}]}>
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
  onChangeText(val){
    this.setState({ partnerToken: val})
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

PartnerValidateOnline = myConnector(PartnerValidateOnline, partnersActionCreators, ['partners', 'auth']);
PartnerValidateOffline = myConnector(PartnerValidateOffline, partnersActionCreators, ['partners', 'auth']);

module.exports = RequiresConnection(PartnerValidateOnline, PartnerValidateOffline)
