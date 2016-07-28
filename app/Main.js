'use strict';
import React, { Component } from 'react';
import { Scene, Router, TabBar, Modal, Schema, Actions, Reducer } from 'react-native-router-flux'

import {
  StyleSheet,
  View,
  Text,
  Navigator,
} from 'react-native';

import Home from './Home';
import PartnerShow from './partners/PartnerShow';
import PartnerValidate from './partners/PartnerValidate';
import Auth from './auth/Auth';
import UserForm from './auth/UserForm';
const MenuBar = require('./components/MenuBar')
import VbWebView from './components/vbWebView'

import colors from './colors'
var baseStyles = require('./styles')

class Main extends Component{

  render() {
    return (
      <Router
        navigationBarStyle={styles.navBar}
        sceneStyle={[styles.sceneStyle]}
        >

      <Scene key="root" tabs={false} hideNavBar={true}>
          <Scene
            component={Auth}
            key="auth"
            hideNavBar={false}
            title='My Pass'
            {...this.props}
          />
          <Scene
            component={UserForm}
            key="userForm"
            hideNavBar={true}
            {...this.props}
          />
          <Scene
            component={VbWebView}
            key="vbWebView"
            hideNavBar={false}
            {...this.props}
          />

          <Scene
            initial={true}
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
      </Router>
    )
  }
};

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: colors.brand,
  },
  sceneStyle:{
    backgroundColor: colors.white,
  },
  routerScene: {
    backgroundColor: colors.white
  },
})
export default Main;
