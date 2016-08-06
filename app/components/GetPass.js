import React, { Component } from 'react';
import { View, StyleSheet, NetInfo, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';

const baseStyles = require('../styles')
const VbText = require('../helpers/vbText')
const VbButton = require('../helpers/vbButton')
import Subscription  from '../subscriptions/Subscription';

class GetPass extends Component{

  onPress(){
    const props = this.props
    NetInfo.isConnected.fetch().done((isConnected) => {

      isConnected ? Actions.userForm({...props}) : Alert.alert("Oops, you're offline", "Please connect to the internet and try again"+isConnected)
    });
  }
  render() {
    // If user has subscription and it's valid
    if(this.props.auth.loggedIn){
      const sub = new Subscription(this.props.subscription)
      if(sub.expires_at && sub.isValid()){
        return ( null );
      }
    }
    return (
      <VbButton
      onPress={this.onPress.bind(this)}
      {...this.props}>Get Pass</VbButton>
    );
  }
};

const styles = StyleSheet.create({

})


import myConnector from '../utils/myConnector'
import * as subscriptionsActionCreators from '../subscriptions/subscriptionsActionCreators';

GetPass = myConnector(GetPass, subscriptionsActionCreators, ['auth', 'subscription']);

module.exports = GetPass
