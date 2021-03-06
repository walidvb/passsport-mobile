import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';

const baseStyles = require('../styles')
const VbText = require('../helpers/vbText')
const VbButton = require('../helpers/vbButton')
const GetPass = require('./GetPass')
import Subscription  from '../subscriptions/Subscription';

class ValidateButton extends Component{

  onPress(){
    const { partner } = this.props
    Actions.partnerValidate({partner: partner, id: partner.id})
  }
  render() {
    const { partner } = this.props
    const sub = new Subscription(this.props.subscription)
    // If user has subscription and it's valid
    if(!this.props.auth.loggedIn){
      if(!sub.isValid()){
        return ( <GetPass {...this.props}/> );
      }
    }
    if(!sub.isValid()){
      return ( <GetPass {...this.props}/> );
    }
    if(!partner.free && !partner.validated){
      return (
        <VbButton
        onPress={this.onPress.bind(this)}
        {...this.props}>UTILISER L'OFFRE</VbButton>
      );
    }
    else{
      return null
    }
  }
};

const styles = StyleSheet.create({
})


import myConnector from '../utils/myConnector'
import * as subscriptionsActionCreators from '../subscriptions/subscriptionsActionCreators';

ValidateButton = myConnector(ValidateButton, subscriptionsActionCreators, ['auth', 'subscription']);

module.exports = ValidateButton
