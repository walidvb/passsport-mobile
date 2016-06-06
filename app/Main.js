'use strict';
import React, { Component } from 'react';
import { Scene, Router, TabBar, Modal, Schema, Actions, Reducer } from 'react-native-router-flux'

import {
  View,
  Text,
} from 'react-native';

import PartnersList from './partners/PartnersList';
import PartnerShow from './partners/PartnerShow';
import PartnerValidate from './partners/PartnerValidate';
import Auth from './auth/Auth';

var baseStyles = require('./styles')

class Main extends Component{
  componentWillMount() {
    console.log('App started');
  }
  render() {
    return (
      <Router>
        <Scene key="root" tabs={true}>
          <Scene
            component={Auth}
            icon={TabIcon}
            key="auth"
            title="Auth"
            style={{paddingTop: 70}}
            {...this.props}
            initial={true}
          />

          <Scene
            icon={TabIcon}
            title="List"
            key="partners"
          >
            <Scene
            initial={true}
              component={PartnersList}
              key="partnersList"
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

class TabIcon extends React.Component {
  render(){
    return (
      <Text style={{color: this.props.selected ? 'blue' :'black'}}>{this.props.title}</Text>
    );
  }
}

export default Main;
