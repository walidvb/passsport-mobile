'use strict';
import React, { Component } from 'react';
import Menu, { MenuContext } from 'react-native-menu';
import { Actions } from 'react-native-router-flux'
const Fabric = require('react-native-fabric');
const { Crashlytics } = Fabric;

import {
  StyleSheet,
  ListView,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableHighlight,
  AsyncStorage,
} from 'react-native';
import Drawer from 'react-native-drawer';

var baseStyles = require('./styles')
const GetPass = require('./components/GetPass')
const VbButton = require('./helpers/vbButton')
const PartnerList = require('./partners/PartnersList')
const MenuBar = require('./components/MenuBar')
import CategoriesList from './categories/CategoriesList'

import Subscription from './subscriptions/Subscription'



class Home extends Component{
  static renderNavigationBar(props){
    return(<MenuBar {...props} style={{paddingTop: 20}} />)
  }
  componentDidMount(){
    setTimeout(() => AsyncStorage.getItem('@Static:sawIntro').then(sawIntro => {sawIntro == '1' ? null : Actions.intro()}), 50)
  }
  render() {

    Crashlytics.setUserIdentifier('1234');
    const sub = new Subscription(this.props.subscription)
    const marginBottom = sub.isValid() ? 0 : 50
    return(
      <MenuContext style={{flex: 1, backgroundColor: 'white'}}>
        <MenuBar {...this.props} style={{paddingTop: 20}} />
        <Drawer
          ref={(ref) => this._drawer = ref}
          type="static"
          open={this.props.ui.filters.drawerOpen}
          content={<CategoriesList {...this.props} />}
          openDrawerOffset={190}
          closedDrawerOffset={0}
          panOpenMask={200}
          onOpenStart={() => {
            if(!this.props.ui.filters.drawerOpen){
              this.props.toggleFilters(true)
            }
          }}
          onCloseStart={() => {
            if(this.props.ui.filters.drawerOpen){
              this.props.toggleFilters(false);
            }
          }}
          styles={{
            drawer:{
              backgroundColor: 'white',
              marginTop: 0,
              overflow: 'hidden'
            }
          }}
          tweenHandler={Drawer.tweenPresets.parallax}
          tapToClose={true}
        >
          <PartnerList {...this.props} style={{
            flex: 1,
            paddingLeft: 15,
            paddingRight: 15,
            marginBottom: marginBottom,
            backgroundColor: 'white',
          }}/>
        </Drawer>
      <GetPass float/>
      </MenuContext>
    )
  }
};

const styles = StyleSheet.create({
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  tableCell: {
    flex: 1,
  }
})

import myConnector from './utils/myConnector'
import * as authActions from './auth/authActionCreators';
import * as subscriptionsActions from './subscriptions/subscriptionsActionCreators';
import * as partnerActions from './partners/partnersActionCreators';
import * as categoriesActions from './categories/categoriesActionCreators';

Home = myConnector(Home, {...authActions, ...subscriptionsActions, ...partnerActions, ...categoriesActions}, ['auth', 'partners', 'subscription', 'categories']);

export default Home;
