'use strict';
import React, { Component } from 'react';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';


import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
} from 'react-native';
const Map = require('../components/Map')
var baseStyles = require('../styles')
var Button = require('react-native-button');


class PartnerShow extends Component{
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    console.log(this.props);
    const partner = _.find(this.props.partners, (p) => p.id === this.props.id)
    this.state = {
      partner,
    }
  }
  largeImgUrl(partner){
    console.log('largeImgUrl', partner);
    partner.logo
  }
  render() {
    const { partner } = this.state;
    console.log(this.props);
    function openValidate(){
      Actions.partnerValidate({partner: partner, id: partner.id})
    }

    console.log(this.props.subscription.isValid(), this.props.auth);
    let validationTrigger;
    if(!this.props.subscription.isValid()){
      validationTrigger = <Button style={baseStyles.button} onPress={openValidate}>Get Pass</Button>
    }
    else if(this.props.subscription.isValidFor(partner)){
      validationTrigger = <Button style={baseStyles.button} onPress={openValidate}>Validate</Button>
    }
    else{
      validationTrigger = <Button style={baseStyles.button} onPress={openValidate}>Validated!</Button>
    }
    return(
      <ScrollView style={baseStyles.container, {flexDirection: 'column', paddingTop: 80, marginBottom: 50}}>
        <Map locations={partner.venues} style={{ flex: 1, height: 330 }}/>
        <Image style={{width: 80, height: 80, borderWidth: 1, borderColor: 'black'}}source={this.largeImgUrl(partner)}/>
        <Text style={{flex:1}}>
          {partner.name}
        </Text>
        <Text style={{flex:1}}>
          {partner.description}
        </Text>
        {validationTrigger}
      </ScrollView>
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
