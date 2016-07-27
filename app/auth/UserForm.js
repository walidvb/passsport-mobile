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
      <View style={{flex: 1, paddingTop: Navigator.NavigationBar.Styles.General.TotalNavHeight}}>
        <WebViewBridge
          ref="webviewbridge"
          onBridgeMessage={this.onBridgeMessage.bind(this)}
          injectedJavaScript={injectScript}
          source={{uri: this.state.url}}/>
      </View>
    )
  }

  onBridgeMessage(message){
    const { webviewbridge } = this.refs;
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
