/* @flow */

import React, { Component } from 'react';
import Menu, { MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu';
import { Actions } from 'react-native-router-flux';

import {
  View,
  Text,
  StyleSheet,
  Image,
  NetInfo,
  Alert,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';

import IconBadge from 'react-native-icon-badge';

const VbIcon = require('../helpers/vbIcon')
const VbText = require('../helpers/vbText')
import Api from '../Api'

import colors from '../colors';

class MenuBar extends Component {
  menuClick(value){
    switch(value){
      case 'about':
        Actions.vbWebView({title: 'About', uri: Api.about_url()})
        break
      case 'faqs':
        Actions.vbWebView({title: 'FAQs', uri: Api.faqs_url()})
        break
      case 'myPass':
        Actions.auth()
        break
      case 'signIn':
        this.props.ui.online ? Actions.userForm() : Alert.alert("Oops, you're offline.", "Please connect to the internet and try again")
        break
      case 'logOut':
        const signOut = () => {
          this.props.signOut(this.props.auth.user)
        }
        this.props.ui.online ? signOut() : Alert.alert("Oops, you're offline.", "Please connect to the internet and try again")
        break
    }
  }
  renderFilterToggle(){
    const activeFiltersCount = this.props.ui.filters.categories.length;
    const catIcon = (<VbIcon
      size={27}
      style={[styles.icon, {color: colors.white, marginLeft: 5}]}
      name='bars'
      onPress={() => this.props.toggleFilters()}
      />
    )
    const catBadge = activeFiltersCount ? (<VbText styles={['light']}  style={{fontSize: 10}} text={activeFiltersCount} onPress={() => this.props.toggleFilters()} />) :
      (this.props.ui.filters.search ? (<VbIcon name='search' style={{color: colors.white}} size={11} onPress={() => this.props.toggleFilters()} />) :
        null)
    return(
      <IconBadge
        MainElement={catIcon}
        BadgeElement={catBadge}
        IconBadgeStyle={{
          width: 18,
          height: 18,
          right: 15,
          top: 5,
          backgroundColor: catBadge ? colors.red : 'transparent',
        }}
      />
    )
  }
  renderLogo(){
    return (<Image
      resizeMode='contain'
      style={{height: 50, flex: 1, zIndex: -1}}
      source={require('../resources/images/logo.png')}/>);
  }
  renderMenuDropdown(){
    const loggedIn = this.props.auth.loggedIn;
    return (
      <Menu onSelect={this.menuClick.bind(this)}>
        <TouchableOpacity>
          <MenuTrigger>
            <VbIcon size={27} style={[styles.icon, {color: colors.white, marginRight: 15}]} name='ellipsis-v'/>
          </MenuTrigger>
        </TouchableOpacity>
        <MenuOptions optionsContainerStyle={styles.menuContainer}>
          {MenuItem('About', 'about')}
          {MenuItem('FAQ', 'faqs')}
          {!loggedIn ? <View/> : MenuItem('My Pass', 'myPass', )}

          {!loggedIn ? MenuItem('Sign Up', 'signIn', { borderTopWidth: 1, borderTopColor: colors.lightGray}) : MenuItem('Log Out', 'logOut', { borderTopWidth: 1, borderTopColor: colors.lightGray})}
        </MenuOptions>
      </Menu>)
  }
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        {this.renderFilterToggle()}
        {this.renderLogo()}
        {this.renderMenuDropdown()}
      </View>
    );
  }
}

const MenuItem = (text, value, style) => (
  <MenuOption value={value} style={[styles.menuItem, style]}>
    <VbText text={text} uppercase/>
  </MenuOption>
)
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 75,
    backgroundColor: colors.brand,
    paddingBottom: 10,
    paddingTop: 10,
  },
  icon: {
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 10,
    paddingBottom: 10,
  },
  menuContainer: {
    marginTop: 55,
    paddingTop: 18,
    paddingRight: 18,
    paddingLeft: 18,
  },
  menuItem: {
    paddingTop: 18,
    paddingBottom: 18,
    marginRight: 18,

  },
  countBubble: {
    position: 'absolute',
    top: -10,
    right: 10,
    width: 25,
    height: 25,
    backgroundColor: colors.red,
    borderRadius: 12.5,
  }
});

import myConnector from '../utils/myConnector'
import * as authActions from '../auth/authActionCreators';
import * as subscriptionsActions from '../subscriptions/subscriptionsActionCreators';
import * as partnerActions from '../partners/partnersActionCreators';
import * as categoriesActions from '../categories/categoriesActionCreators';

MenuBar = myConnector(MenuBar, {...authActions, ...subscriptionsActions, ...partnerActions, ...categoriesActions}, ['auth', 'partners', 'subscription', 'categories']);


module.exports = MenuBar
