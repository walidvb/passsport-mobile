'use strict';
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
  componentWillReceiveProps(props){
  }
  renderHeader(partner){
    const validBanner = partner.validated ? <ValidBanner/> : null
    return (
      <View>
        <OverlayImage source={{uri: partner.tile_image}} style={[{height: 300, flex: .25}, {marginTop: Navigator.NavigationBar.Styles.General.TotalNavHeight}]}>
          { validBanner }
        </OverlayImage>
      </View>
    )
  }
  renderTabs(partner){
    return(
      <ScrollableTabView
        tabBarUnderlineColor={colors.brand}
        tabBarActiveTextColor={colors.brand}
        tabBarInactiveTextColor={colors.black}
        tabBarTextStyle={[baseStyles.text, {fontWeight: 'bold',}]}
        prerenderingSiblingsNumber={2}
        >
        <PartnerOffer tabLabel="OFFER" partner={partner} stayle={{flex:1}}/>
        <PartnerAbout tabLabel="ABOUT" partner={partner} stayle={{flex:1}}/>
      </ScrollableTabView>
    )
  }
  render() {
    const { partner } = this.state;

    const validator = <ValidateButton float partner={partner} />
    const padding = partner.validated ? 0 : 50

    return (<View style={{flex: 1, paddingBottom: padding}}>{validator}
      <ParallaxScrollView
        backgroundSpeed={25}
        parallaxHeaderHeight={300}
        renderBackground={this.renderHeader.bind(this, partner)}
        renderForeground={() => (
          <View style={{flex: 1, justifyContent: 'center', paddingTop: 65, paddingLeft: 15, paddingRight: 15}}>
            <VbText styles={['light', 'xlarge', 'bold', 'centered']} uppercase style={styles.partnerName} text={partner.name}/>
          </View>
        )}
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

PartnerShow = myConnector(PartnerShow, partnersActionCreators, ['partners', 'subscription']);

module.exports = PartnerShow
