'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  ListView,
  Text,
  TextInput,
  View,
  TouchableHighlight,
} from 'react-native';
var baseStyles = require('../styles')

import UserForm from './UserForm'
class Auth extends Component{
  constructor(props) {
    super(props);
    this.state={
      newUser: true
    };
  }
  renderSubscriptionStatus(){
    if(this.props.subscription){
      if(this.props.subscription.isValid()){
        return (<Text>Expires at {this.props.subscription.expires_at}</Text>)
      }
      else{
        return (<Text>Subscription Expired!</Text>)
      }
    }
    else{
      return (<Text>No Subscription</Text>)
    }
  }
  render() {
    if(!this.props.auth.loggedIn){
      return (
        <UserForm {...this.props}/>
      )
    }
    else{
      return(
        <View style={baseStyles.container, {flexDirection: 'column'}}>
          <Text>You're logged in!</Text>
          {this.renderSubscriptionStatus()}
          <TouchableHighlight style={baseStyles.button} onPress={this.props.signOut}>
            <Text>LOG OUT</Text>
          </TouchableHighlight>
        </View>
      )
    }
  }
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: 'grey',
    paddingLeft: 5,
    marginBottom: 5,
    //borderBottomWidth: 1, borderBottomColor: 'grey'
  }
})

import myConnector from '../utils/myConnector'
import * as authActions from './authActionCreators';
Auth = myConnector(Auth, authActions, ['auth', 'subscription']);

export default Auth;
