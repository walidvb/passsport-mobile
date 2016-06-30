import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';

const baseStyles = require('../styles')
const VbText = require('../helpers/vbText')
const VbButton = require('../helpers/vbButton')
import Subscription  from '../subscriptions/Subscription';

class GetPass extends Component{

  onPress(){
    Actions.auth({action: 'get-pass'});
  }
  render() {
    // If user has subscription and it's valid
    if(this.props.auth.loggedIn){
      const sub = new Subscription(this.props.subscription)
      if(sub.exists && sub.isValid()){
        return (
          <VbButton
              {...this.props}>hav pass</VbButton>
        );
      }
    }
    console.log('asdsad');
    return (
      <VbButton
      onPress={this.onPress}
      float>Get Pass</VbButton>
    );
  }
};

const styles = StyleSheet.create({

})


import myConnector from '../utils/myConnector'
import * as subscriptionsActionCreators from '../subscriptions/subscriptionsActionCreators';

GetPass = myConnector(GetPass, subscriptionsActionCreators, ['auth', 'subscription']);

module.exports = GetPass
