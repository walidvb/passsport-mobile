'use strict';
import React, { Component } from 'react';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import Subscription from '../subscriptions/Subscription'

const ScrollableTabView = require('react-native-scrollable-tab-view');
const VbText = require('../helpers/vbText')

import {
  View,
  Image,
  StyleSheet,
} from 'react-native';

const PartnerAbout = require('./_partnerAbout')
const PartnerOffer = require('./_partnerOffer')

const baseStyles = require('../styles')
import colors from '../colors'
const Button = require('react-native-button');


class PartnerShow extends Component{
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    const partner = _.find(this.props.partners, (p) => p.id === this.props.id)
    this.state = {
      partner,
    }
  }
  largeImgUrl(partner){
    console.log('largeImgUrl', partner.logo);
    return { uri: partner.logo }
  }
  render() {
    const { partner } = this.state;
    function openValidate(){
      Actions.partnerValidate({partner: partner, id: partner.id})
    }
    let validationTrigger;
    const sub = new Subscription(this.props.subscription);
    if(!sub.exists){
      validationTrigger = <Button style={baseStyles.button} onPress={openValidate}>Get Pass</Button>
    }
    else if(sub.isAvailableFor(partner)){
      validationTrigger = <Button style={baseStyles.button} onPress={openValidate}>Validate</Button>
    }
    else{
      validationTrigger = <Button style={baseStyles.button} onPress={openValidate}>Validated!</Button>
    }
    console.log(colors);
    return(
      <View style={{flex:1, alignItems: 'stretch'}}>
        <Image
          source={{uri: partner.tile_image}}
          style={styles.thumbnail}
          resizeMode="cover"
        >
          <VbText uppercase title text={partner.name} />
        </Image>
        <ScrollableTabView
          style={{marginTop: 50}}
          tabBarUnderlineColor={colors.brand}
          tabBarActiveTextColor={colors.brand}
          tabBarTextStyle={{fontWeight: 'bold'}}
          >
          <PartnerAbout tabLabel="ABOUT" partner={partner} style={{flex:1}}/>
          <PartnerOffer tabLabel="OFFER" partner={partner} style={{flex:1}}/>
        </ScrollableTabView>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  partnersList: {
  },
  thumbnail: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
  }
})

import myConnector from '../utils/myConnector'
import * as partnersActionCreators from './partnersActionCreators';

PartnerShow = myConnector(PartnerShow, partnersActionCreators, ['partners', 'subscription']);

module.exports = PartnerShow
