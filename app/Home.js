'use strict';
import React, { Component } from 'react';

import {
  StyleSheet,
  ListView,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableHighlight,
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
  constructor(props){
    super(props);
    this.state = {
      partners: this.props.partners
    }
    this.props.getPartners();
    this.props.getSubscriptionDetails();
    this.props.getUserDetails();
  }
  componentWillReceiveProps(props){
    this.setState({
      ...this.state,
      partners: this.props.partners,
    })
  }
  render() {
    console.log(this.props.ui.filters);
    return(
      <Drawer
        type="overlay"
        content={<CategoriesList {...this.props} />}
        openDrawerOffset={140}
        styles={{
          drawer:{
            backgroundColor: 'white',
          }
        }}
        open={this.props.ui.filters.drawerOpen}
        tweenHandler={Drawer.tweenPresets.parallax}
      >
        <MenuBar {...this.props} />
        <PartnerList partners={this.state.partners} style={{flex: 1,paddingLeft: 15, paddingRight: 15, marginBottom: 60}}/>
        <GetPass float/>
      </Drawer>
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
