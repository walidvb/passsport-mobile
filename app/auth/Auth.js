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
  render() {
    if(!this.props.auth.loggedIn){
      return (
        <UserForm {...this.props}/>
      )
    }
    else{
      return(
        <Text>
          Logged in
        </Text>
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
Auth = myConnector(Auth, authActions, ['auth']);

export default Auth;
