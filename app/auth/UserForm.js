'use strict';
import React, { Component } from 'react';
import { StyleSheet, View, Navigator } from 'react-native';
var baseStyles = require('../styles');
import WebViewBridge from 'react-native-webview-bridge';
import { Actions } from 'react-native-router-flux';
import Api from '../Api'

const injectScript = `if(sendMsg){sendMsg()}`

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
    console.log('message from webViewBridge', message);
    message = JSON.parse(message);
    console.log('message from webViewBridge', message, this.props);
    switch(message.type){
      case 'POP':
        Actions.pop();
        break;
      case 'SIGNED_UP_SUCCESSFUL':
        this.props.signUp(message.data.user, {
          subscription: message.data.subscription,
        })
        break;
      case 'SIGNED_IN_SUCCESSFUL':
        this.props.signIn(message.data.user, {
          subscription: message.data.subscription,
        })
        if(message.data.subscription){
          Actions.pop();
        }
        break;
      case 'SUBSCRIPTION_CREATED':
        this.props.subscriptionFetched(message.data.subscription)
        Actions.pop()
        break;
      case 'TERMS':
      Actions.vbWebView({title: 'Terms', uri: Api.terms_url()})

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


import myConnector from '../utils/myConnector'
import * as authActions from '../auth/authActionCreators';
import * as subscriptionsActions from '../subscriptions/subscriptionsActionCreators';

UserForm = myConnector(UserForm, {...authActions, ...subscriptionsActions}, ['auth', 'subscription']);

export default UserForm
