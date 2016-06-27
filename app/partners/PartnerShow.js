'use strict';
import React, { Component } from 'react';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import Subscription from '../subscriptions/Subscription'

const ScrollableTabView = require('react-native-scrollable-tab-view');


import {
  StyleSheet,
} from 'react-native';

const PartnerAbout = require('./_partnerAbout')
const PartnerOffer = require('./_partnerOffer')

var baseStyles = require('../styles')
var Button = require('react-native-button');


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
    return(
      <ScrollableTabView>
        <PartnerAbout tabLabel="About" partner={partner}/>
        <PartnerOffer tabLabel="Offer" partner={partner}/>
      </ScrollableTabView>
    )
  }
};

const styles = StyleSheet.create({
  partnersList: {
  },
  thumbnail: {
    width: 30,
    height: 30,
    margin: 10,
  }
})

import myConnector from '../utils/myConnector'
import * as partnersActionCreators from './partnersActionCreators';

PartnerShow = myConnector(PartnerShow, partnersActionCreators, ['partners', 'subscription']);

module.exports = PartnerShow
