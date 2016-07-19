/* @flow */

import React, { Component } from 'react';
import Menu, { MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu';
import { Actions } from 'react-native-router-flux';

import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
const VbIcon = require('../helpers/vbIcon')
const VbText = require('../helpers/vbText')
import Api from '../Api'

import colors from '../colors';

class MenuBar extends Component {
  menuClick(value){
    switch(value){
      case 'about':
        Actions.vbWebView({uri: Api.about_url()})
        break
      case 'faqs':
        Actions.vbWebView({uri: Api.faqs_url()})
        break
      case 'myPass':
        Actions.auth()
        break
      case 'logOut':
        this.props.signOut()
        break
    }
  }
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <VbIcon
          size={27}
          style={[styles.icon, {color: colors.white}]}
          name='bars'
          onPress={this.props.toggleFilters}/>
        <Image
          resizeMode='contain'
          style={{height: 40, flex: 1,}}
          source={require('../resources/images/logo.png')}></Image>
          <Menu onSelect={this.menuClick.bind(this)}>
            <MenuTrigger>
              <VbIcon size={27} style={[styles.icon, {color: colors.white, marginRight: 15}]} name='ellipsis-v'/>
            </MenuTrigger>
            <MenuOptions optionsContainerStyle={styles.menuContainer}>
              {MenuItem('About', 'about')}
              {MenuItem('FAQS', 'faqs')}
              {MenuItem('My Pass', 'myPass', { borderBottomWidth: 1, borderBottomColor: colors.lightGray})}

              {MenuItem('Log Out', 'logOut')}
            </MenuOptions>
          </Menu>
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
    height: 60,
    backgroundColor: colors.brand,
    paddingBottom: 10,
    paddingTop: 10,
  },
  icon: {
    paddingLeft: 25,
    paddingRight: 25,
  },
  menuContainer: {
    marginTop: 38,
    paddingTop: 18,
    paddingRight: 18,
    paddingLeft: 18,
  },
  menuItem: {
    paddingTop: 18,
    paddingBottom: 18,
    marginRight: 18,

  }
});

module.exports = MenuBar
