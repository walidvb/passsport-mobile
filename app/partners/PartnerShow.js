'use strict';
var Fabric = require('react-native-fabric');
var { Answers } = Fabric;

import React, { Component } from 'react';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import Subscription from '../subscriptions/Subscription'

import ParallaxScrollView from 'react-native-parallax-scroll-view';
const ScrollableTabView = require('react-native-scrollable-tab-view');
const VbText = require('../helpers/vbText')
const OverlayImage = require('../helpers/overlayImage');

import {
  View,
  Image,
  StyleSheet,
  Navigator,
  Text,
  Dimensions,
} from 'react-native';

const PartnerAbout = require('./_partnerAbout')
const PartnerOffer = require('./_partnerOffer')
const ValidateButton = require('../components/validateButton')
import ValidBanner from './_partnerValidBanner'

const baseStyles = require('../styles')
import colors from '../colors'

const headerHeight = Dimensions.get('window').width <= 480 ? 18*13 : 18*17


class PartnerShow extends Component{
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    const partner = _.find(this.props.partners, (p) => p.id === this.props.id)
    this.state = {
      partner,
    }
    Answers.logContentView('Partner Show', 'Partner', partner.name, { ...this.props.auth.user });

  }
  largeImgUrl(partner){
    return { uri: partner.logo }
  }
  componentWillReceiveProps(props){
  }
  renderHeader(partner){
    const validBanner = partner.validated ? <ValidBanner/> : null
    return (
      <View>
      <OverlayImage source={{uri: partner.tile_image}} style={[{
        height: headerHeight*0.75,
        marginTop: Navigator.NavigationBar.Styles.General.TotalNavHeight,
        justifyContent: 'center'}]}>
        { validBanner }
        <View style={{flex: 1, justifyContent: 'center', paddingLeft: 15, paddingRight: 15}}>
          <VbText styles={['light', 'xlarge', 'bold', 'centered']} uppercase style={styles.partnerName} text={partner.name}/>
        </View>
      </OverlayImage>
      </View>
    )
  }
  renderTabs(partner){
    return(
      <ScrollableTabView
        forceScrollView={true}
        tabBarUnderlineStyle={{backgroundColor: colors.brand, height: 2}}
        tabBarActiveTextColor={colors.brand}
        tabBarInactiveTextColor={colors.black}
        tabBarTextStyle={[baseStyles.bold]}
        prerenderingSiblingsNumber={2}
        >
        <PartnerOffer {...this.props} tabLabel="OFFRE" partner={partner}/>
        <PartnerAbout {...this.props} tabLabel="À PROPOS" partner={partner}/>
      </ScrollableTabView>
    )
  }
  render() {
    const { partner } = this.state;

    const validator = <ValidateButton float partner={partner} />
    const padding = partner.validated ? 0 : 50

    return (<View style={{flex: 1, paddingBottom: padding}}>{validator}
      <ParallaxScrollView
        contentContainerStyle={{}}
        backgroundSpeed={55}
        backgroundColor={colors.brandColor}
        parallaxHeaderHeight={headerHeight}
        renderBackground={this.renderHeader.bind(this, partner)}
      >
      {this.renderTabs(partner)}
      </ParallaxScrollView>
      {validator}
    </View>)
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

PartnerShow = myConnector(PartnerShow, partnersActionCreators, ['auth', 'partners', 'subscription']);

module.exports = PartnerShow
