'use strict';
import React, { Component } from 'react';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import Subscription from '../subscriptions/Subscription'

const ScrollableTabView = require('react-native-scrollable-tab-view');
const VbText = require('../helpers/vbText')
const OverlayImage = require('../helpers/overlayImage');

import {
  View,
  Image,
  StyleSheet,
} from 'react-native';

const PartnerAbout = require('./_partnerAbout')
const PartnerOffer = require('./_partnerOffer')
const ValidateButton = require('../components/validateButton')
import ValidBanner from './_partnerValidBanner'

const baseStyles = require('../styles')
import colors from '../colors'


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
    return { uri: partner.logo }
  }

  render() {
    const { partner } = this.state;
    const validBanner = partner.validated ? <ValidBanner/> : null

    function openValidate(){
      Actions.partnerValidate({partner: partner, id: partner.id})
    }

    const validator = <ValidateButton float partner={partner} />
    const padding = partner.validated ? 0 : 50
    return(
      <View style={{flex:1, alignItems: 'stretch', paddingBottom: padding, marginTop: 60}}>
        <OverlayImage source={{uri: partner.tile_image}} style={{height: 50, flex: .25}}>
          { validBanner }
          <VbText light large bold uppercase style={styles.partnerName} text={partner.name}/>
        </OverlayImage>
        <ScrollableTabView
          tabBarUnderlineColor={colors.brand}
          tabBarActiveTextColor={colors.brand}
          tabBarTextStyle={{fontWeight: 'bold'}}
          style={{flex: .75}}
          >
          <PartnerAbout tabLabel="ABOUT" partner={partner} style={{flex:1}}/>
          <PartnerOffer tabLabel="OFFER" partner={partner} style={{flex:1}}/>
        </ScrollableTabView>
        {validator}
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
    height: 150,
  }
})

import myConnector from '../utils/myConnector'
import * as partnersActionCreators from './partnersActionCreators';

PartnerShow = myConnector(PartnerShow, partnersActionCreators, ['partners', 'subscription']);

module.exports = PartnerShow
