import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
var baseStyles = require('../styles')
import colors from '../colors'

const HTMLView = require('react-native-htmlview')
const Map = require('../components/Map')
const VbText = require('../helpers/vbText')
const VbLink = require('../helpers/vbLink')
const VbIcon = require('../helpers/vbIcon')

class PartnerAbout extends Component{
  render() {
    const { partner } = this.props;
    return (
    	<ScrollView style={{flex: 1, flexDirection: 'column', flexWrap: 'wrap'}}>
        <View style={styles.contact}>
          <VbLink url="asd">
            <VbIcon style={styles.icon} name="map-marker"/>
            {partner.contact}
          </VbLink>
          <VbLink url={partner.website}>
            <VbIcon style={styles.icon} name="globe"/>
            {partner.website}
          </VbLink>
          <VbLink url={"tel:"+partner.phone}>
            <VbIcon style={styles.icon} name="phone"/>
            {partner.phone}
          </VbLink>
          <VbLink url={"mailto:"+partner.email}>
            <VbIcon style={styles.icon} name="envelope"/>
            {partner.email}
          </VbLink>
        </View>
        <View style={styles.findUs}>
          <VbText text="Find us on:" style={{marginRight: 25}}></VbText>
          {partner.facebook ? (<VbLink url={partner.facebook}>
            <VbIcon style={styles.icon} name="facebook"/>
          </VbLink>) : null}
          {partner.facebook ? (<VbLink url={partner.twitter}>
            <VbIcon style={styles.icon} name="twitter"/>
          </VbLink>) : null}
        </View>
        <View style={{paddingLeft: 15, paddingRight: 15}}>
          <HTMLView value={partner.description} stylesheet={{}}/>
        </View>
        <Map locations={partner.venues} style={{ flex: 1, height: 150 }}/>
    	</ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  contact: {

    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: 'column',
  },
  findUs: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
  },
  icon: {
    color: colors.lightGray,
    marginRight: 10,
  }
})

module.exports = PartnerAbout
