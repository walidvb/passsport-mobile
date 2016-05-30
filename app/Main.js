'use strict';
import React, { Component } from 'react';
import { Scene, Router, TabBar, Modal, Schema, Actions, Reducer } from 'react-native-router-flux'

import {
  View,
  Text,
} from 'react-native';

import PartnersList from './partners/PartnersList';
import PartnerShow from './partners/PartnerShow';
import UserForm from './auth/UserForm';

var baseStyles = require('./styles')


class Main extends Component{
  render() {
    return (
      <Router>
        <Scene key="root" tabs={true}>
          <Scene
            component={UserForm}
            icon={TabIcon}
            key="auth"
            title="Auth"
            initial={true}
            {...this.props}
          />

          <Scene
            icon={TabIcon}
            title="List"
            key="partners"
            initial={true}
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
              icon={TabIcon}
              key="partnerShow"
              title="Show"
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
      <Text style={{color: this.props.selected ? 'red' :'black'}}>{this.props.title}</Text>
    );
  }
}


export default Main;
