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
import filterPartners from './partners/_partnersFilter'

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
    const filteredPartners = filterPartners(props.partners, props.ui.filters)
    if(filteredPartners !== this.state.partners)
    this.setState({
      ...this.state,
      partners: filteredPartners,
    })

  }
  render() {
    const sub = new Subscription(this.props.subscription)
    return(
      <Drawer
        type="static"
        content={<CategoriesList {...this.props} />}
        openDrawerOffset={160}
        closedDrawerOffset={0}
        onOpen={() => this.props.toggleFilters(true)}
        onClose={() => this.props.toggleFilters(false)}
        styles={{
          drawer:{
            backgroundColor: 'white',
            marginTop: 60,
            overflow: 'hidden'
          }
        }}
        open={this.props.ui.filters.drawerOpen}
        tweenHandler={Drawer.tweenPresets.parallax}
        tapToClose={true}
      >
        <MenuBar {...this.props} style={{paddingTop: 20}} />
        <PartnerList partners={this.state.partners} style={{
          flex: 1,paddingLeft: 15, paddingRight: 15, marginBottom: sub.isValid() ? 0 : 60,
        }}/>
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
