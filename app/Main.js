'use strict';
import React, { Component } from 'react';
import { Scene, Router, TabBar, Modal, Schema, Actions, Reducer } from 'react-native-router-flux'

import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import Home from './Home';
import PartnerShow from './partners/PartnerShow';
import PartnerValidate from './partners/PartnerValidate';
import Auth from './auth/Auth';
const MenuBar = require('./components/MenuBar')

import colors from './colors'
var baseStyles = require('./styles')

class Main extends Component{
  render() {
    return (
      <Router
        navigationBarStyle={styles.navBar}
        sceneStyle={styles.routerScene}
        >

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
              hideNavBar={true}
              component={Home}
              key="home"
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

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: colors.brand,
    top: 0
  },
  routerScene: {
    //paddingTop: 20,
    backgroundColor: colors.white
  },
})
export default Main;
