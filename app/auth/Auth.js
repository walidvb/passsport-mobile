'use strict';
import React, { Component } from 'react';

import {
  StyleSheet,
  ListView,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
var baseStyles = require('../styles')
const GetPass = require('../components/GetPass')
const VbText = require('../helpers/vbText')
const VbButton = require('../helpers/vbButton')

import Subscription from '../subscriptions/Subscription'
import UserForm from './UserForm'

const row = (header, cell) => {
  return(
    <View style={styles.tableRow}>
      <VbText style={styles.tableCell} uppercase bold text={header}/>
      <VbText style={styles.tableCell} text={cell}/>
    </View>
  )
}

class Auth extends Component{
  constructor(props) {
    super(props);
    this.state={
      newUser: true,
      showUserForm: this.props.action == 'get-pass',
    };
    this.setState({
      subscription: props.subscription
    })
  }
  componentWillReceiveProps(props){
    this.subscription = new Subscription(props.subscription)
    this.setState({
      subscription: props.subscription
    })
  }
  renderSubscriptionStatus(){
    let sub =  new Subscription(this.state.subscription);
    if(sub.isValid()){
      return row('Exipration Date:', sub.expires_at.toDateString())
    }
    else if(sub.expires_at){
      return row('Exipration Date:', user.name)
    }
    else{
      return (<GetPass/>)
    }
  }
  render() {
    if(!this.props.auth.loggedIn || this.state.showUserForm){
      return (
        <UserForm {...this.props}/>
      )
    }
    else{
      const { user } = this.props.auth;
      return(
        <ScrollView style={baseStyles.container, {flexDirection: 'column', paddingLeft: 15, paddingRight:15,}}>
          {row('Name:', user.name)}
          {row('Token:', user.token)}
          {row('Email:', user.email)}
          {this.renderSubscriptionStatus()}
          {row('Validated Partners: ', this.state.subscription.validated_partner_ids.length)}
          {this.validatedPartnerList}
        </ScrollView>
      )
    }
  }
};

const styles = StyleSheet.create({
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  tableCell: {
    flex: 1,
  }
})

import myConnector from '../utils/myConnector'
import * as authActions from './authActionCreators';
import * as subscriptionsActions from '../subscriptions/subscriptionsActionCreators';
Auth = myConnector(Auth, {...authActions, ...subscriptionsActions}, ['auth', 'subscription']);

export default Auth;
