'use strict';
import React, { Component } from 'react';
import RequiresConnection from 'react-native-offline-mode';

import KeyboardSpacer from 'react-native-keyboard-spacer';

import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Navigator,
  KeyboardAvoidingView
} from 'react-native';

var baseStyles = require('../styles')
import colors from '../colors'
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
      <KeyboardAvoidingView behavior='padding' style={[styles.container, {marginTop: Navigator.NavigationBar.Styles.General.TotalNavHeight}]}>
          <VbText
            text={`Please ask the partner to \n input his code:`}
            uppercase
            styles={['bold']}
            style={{
              textAlign: 'center',
            }}/>
          {error}
          <View style={{borderBottomColor: colors.lightGray, borderBottomWidth: 1, alignSelf: 'stretch', marginBottom: 18,}}>
            <TextInput
              autofocus
              style={{
                textAlign: 'center',
                height: 40,
                fontFamily: 'Lato',
                fontWeight: 'bold',
              }}
              placeholder='XXXX'
              ref='partnerToken'
              onChangeText={this.onChangeText.bind(this)}
              keyboardType='numeric'
              autoCapitalize={"characters"}
            />
          </View>
          <VbButton
            disabled={this.state.partnerToken.length}
            onPress={this.props.validatePartner.bind(this, this.props.partner, this.state.partnerToken.toLowerCase())}>
            {"Validate"}
          </VbButton>
      </KeyboardAvoidingView>
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
    paddingTop: 18,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingLeft: 15,
    paddingRight: 15,
    flex: 1,
  },
})

import myConnector from '../utils/myConnector'
import * as partnersActionCreators from './partnersActionCreators';

PartnerValidateOnline = myConnector(PartnerValidateOnline, partnersActionCreators, ['partners', 'auth']);
PartnerValidateOffline = myConnector(PartnerValidateOffline, partnersActionCreators, ['partners', 'auth']);

module.exports = RequiresConnection(PartnerValidateOnline, PartnerValidateOffline)
