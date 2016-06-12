'use strict';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
var baseStyles = require('../styles');
import WebViewBridge from 'react-native-webview-bridge';
import Api from '../Api'

class UserForm extends Component{
  onBridgeMessage(message){
    const { webviewbridge } = this.refs;
    switch (message) {
      case "hello from webview":
        webviewbridge.sendToBridge("hello from react-native");
        break;
      case "got the message inside webview":
        console.log("we have got a message from webview! yeah");
        break;
    }
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
