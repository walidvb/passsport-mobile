'use strict';
import React, { Component } from 'react';
import { Scene, Router, TabBar, Modal, Schema, Actions, Reducer } from 'react-native-router-flux'

import {
  View,
  Text,
} from 'react-native';

import Home from './Home';
import PartnerShow from './partners/PartnerShow';
import PartnerValidate from './partners/PartnerValidate';
import Auth from './auth/Auth';

var baseStyles = require('./styles')

class Main extends Component{
  render() {
    return (
      <Router>
        <Scene key="root" tabs={false}>
          <Scene
            component={Auth}
            key="auth"
            hideNavBar={false}
            {...this.props}
          />

          <Scene
            key="partners"
            initial={true}
          >
            <Scene
            initial={true}
              component={Home}
              key="home"
              hideNavBar={true}
              {...this.props}
            />
            <Scene
              component={PartnerShow}
              key="partnerShow"
              title="Show"
              hideNavBar={false}
              {...this.props}
            />
            <Modal
              component={PartnerValidate}
              key="partnerValidate"
              title="Validate"
              hideNavBar={false}
              {...this.props}
            />
          </Scene>
        </Scene>
      </Router>
    )
  }
};

export default Main;
