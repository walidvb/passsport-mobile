'use strict';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
var baseStyles = require('../styles');
import WebViewBridge from 'react-native-webview-bridge';
import { Actions } from 'react-native-router-flux';
import Api from '../Api'


class UserForm extends Component{
  onBridgeMessage(message){
    const { webviewbridge } = this.refs;
    message = JSON.parse(message);
    console.log('message', message, this.props);
    this.props.signUp(message.data.user, { subscription: message.data.subscription })
  }
  render() {
    return (
      <WebViewBridge
        ref="webviewbridge"
        onBridgeMessage={this.onBridgeMessage.bind(this)}
        source={{uri: Api.userUrl()}}/>
    )
  }
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: 'grey',
    paddingLeft: 5,
    marginBottom: 5,
  }
})

export default UserForm
