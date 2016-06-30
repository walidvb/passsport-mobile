'use strict';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
var baseStyles = require('../styles');
import WebViewBridge from 'react-native-webview-bridge';
import { Actions } from 'react-native-router-flux';
import Api from '../Api'

const injectScript = ``

class UserForm extends Component{
  constructor(props) {
    super(props);
    const { auth } = this.props
    const url = auth.loggedIn ? Api.newSubscriptionUrl(auth.user.auth_token) : Api.userUrl();
    this.state = {
      url: url
    }
  }
  render() {
    return (
      <WebViewBridge
        ref="webviewbridge"
        onBridgeMessage={this.onBridgeMessage.bind(this)}
        injectedJavaScript={injectScript}
        source={{uri: this.state.url}}/>
    )
  }

  onBridgeMessage(message){
    const { webviewbridge } = this.refs;
    message = JSON.parse(message);
    console.log('message', message, this.props);
    switch(message.type){
      case 'POP':
        Actions.pop();
        break;
      case 'SIGNED_UP_SUCCESSFUL':
        this.props.signUp(message.data.user, {
          subscription: message.data.subscription,
        })
        break;
      case 'SUBSCRIPTION_FETCHED':
        this.props.subscriptionFetched(message.data.subscription)
        break;
      default:
        break;
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
  }
})

export default UserForm
