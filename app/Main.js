'use strict';
import React, { Component } from 'react';
import {
  View,
} from 'react-native';

import PartnersList from './partners/PartnersList';
import UserForm from './auth/UserForm';
var baseStyles = require('./styles')


class Main extends Component{
  render() {
    const route = 'auth';

    const partners = route != 'partners' ? null : <PartnersList {...this.props}></PartnersList>
    const auth = route != 'auth' ? null : <UserForm {...this.props}/>
    return (
      <View style={[baseStyles.container,{paddingTop: 20}]}>
        {auth}
        {partners}
      </View>
    )
  }
};

export default Main
