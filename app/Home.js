'use strict';
import React, { Component } from 'react';
import Menu, { MenuContext } from 'react-native-menu';


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
  }
  static renaderNavigationBar(props){
    return(<MenuBar {...props} style={{paddingTop: 20}} />)
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
          open={this.props.ui.filters.drawerOpen}
          content={<CategoriesList {...this.props} />}
          openDrawerOffset={170}
          closedDrawerOffset={0}
          onOpen={() => this.props.toggleFilters(true)}
          onClose={() => this.props.toggleFilters(false)}
          styles={{
            drawer:{
              backgroundColor: 'white',
              marginTop: 15,
              paddingBottom: 15,
              overflow: 'hidden'
            }
          }}
          tweenHandler={Drawer.tweenPresets.parallax}
          tapToClose={true}
        >
        <MenuContext style={{flex: 1, backgroundColor: 'white'}}>
          <MenuBar {...this.props} style={{paddingTop: 20}} />
          <PartnerList partners={this.state.partners} style={{
            flex: 1,
            paddingLeft: 15,
            paddingRight: 15,
            marginBottom: sub.isValid() ? 0 : 50,
          }}/>
          <GetPass float/>
          </MenuContext>
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
