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
        titleStyle={[baseStyles.text, {color: colors.white}]}
        backButtonImage={require('./resources/images/back_chevron.png')}
        >

      <Scene key="root" tabs={false} hideNavBar={true}>
          <Scene
            component={Auth}
            key="auth"
            hideNavBar={false}
            title='My Pass'
            {...this.props}
            direction="leftToRight"
          />
          <Scene
            component={UserForm}
            key="userForm"
            hideNavBar={true}
            {...this.props}
            direction="vertical"
            panHandlers={null}
          />
          <Scene
            component={VbWebView}
            key="vbWebView"
            hideNavBar={false}
            {...this.props}
            direction="vertical"
            panHandlers={null}
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
            title="Partner"
            hideNavBar={false}
            {...this.props}
          />
          <Modal
            component={PartnerValidate}
            key="partnerValidate"
            title="Validate"
            hideNavBar={false}
            {...this.props}
            direction="vertical"
          />
        </Scene>
      </Router>
    )
  }
};

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: colors.brand,
    height: 65,
    paddingTop: 10,
    paddingBottom: 10,
  },
  sceneStyle:{
    backgroundColor: colors.white,
  },
  routerScene: {
    backgroundColor: colors.white
  },
})
export default Main;
