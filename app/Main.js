'use strict';
import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';

import {
  View,
} from 'react-native';

import PartnersList from './partners/PartnersList';
import PartnerShow from './partners/PartnerShow';
import UserForm from './auth/UserForm';

var baseStyles = require('./styles')


class Main extends Component{
  render() {
    return (
      <Router>
      <Scene key="root">
        <Scene key="auth" {...this.props} component={UserForm} title="Auth" initial={true}/>
       </Scene>
        <Scene key="partners" initial={true}>
          <Scene key="partnersList" {...this.props} component={PartnersList} title="List" initial={true}/>
          <Scene key="partnerShow" {...this.props} component={PartnerShow} title="Show"/>
         </Scene>
      </Router>
    )
  }
};

export default Main;
