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

import { Actions } from 'react-native-router-flux';


var baseStyles = require('../styles')
import colors from '../colors'
const GetPass = require('../components/GetPass')
const VbText = require('../helpers/vbText')
const VbButton = require('../helpers/vbButton')
const PartnerList = require('../partners/PartnersList')
import Subscription from '../subscriptions/Subscription'
import UserForm from './UserForm'

const row = (header, cell) => {
  return(
    <View style={styles.tableRow}>
      <VbText style={styles.tableCell} uppercase styles={['bold']} text={header}/>
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
      subscription: props.subscription
    };
  }
  componentWillReceiveProps(props){
    this.subscription = new Subscription(props.subscription)
    this.setState({
      subscription: props.subscription
    })
    // Actions.refresh()
  }
  renderSubscriptionStatus(){
    let sub =  new Subscription(this.state.subscription);
    if(sub.isValid()){
      return row('Expiration Date:', sub.expires_at.toDateString())
    }
    else if(sub.expires_at){
      return row('Expiration Date:', 'Expired!')
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
      const sub =  new Subscription(this.props.subscription);
      const validatedPartners = _.filter(this.props.partners || [], (p) => p.validated)

      const list = validatedPartners.length ? <PartnerList partners={validatedPartners} style={styles.validatedList} smallCell noValidateBanner/> : null
      return(
        <ScrollView style={baseStyles.container, {flexDirection: 'column', paddingLeft: 15, paddingRight:15}}>
          <View style={styles.details}>
            {row('Name:', user.name)}
            {user.token ? row('Token:', user.token.toUpperCase()) : null}
            {row('Email:', user.email)}
            {this.renderSubscriptionStatus()}
            {sub.isValid() ? row('Validated Partners:', validatedPartners.length) : null}
          </View>
          {list}
        </ScrollView>
      )
    }
  }
};

const styles = StyleSheet.create({
  details: {
    paddingBottom: 0,
    marginBottom: 13.5,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  tableCell: {
    flex: 1,
  },
  validatedList: {
    flex: 1,
  }
})

import myConnector from '../utils/myConnector'
import * as authActions from './authActionCreators';
import * as subscriptionsActions from '../subscriptions/subscriptionsActionCreators';
Auth = myConnector(Auth, {...authActions, ...subscriptionsActions}, ['auth', 'partners', 'subscription']);

export default Auth;
