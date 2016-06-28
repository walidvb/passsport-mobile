import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
var baseStyles = require('../styles')
const HTMLView = require('react-native-htmlview')
const Map = require('../components/Map')

class PartnerAbout extends Component{
  render() {
    const { partner } = this.props;
    return (
    	<ScrollView style={{flex: 1, flexDirection: 'column', flexWrap: 'wrap'}}>
        <View style={styles.contact}>
          <Text>{partner.contact}</Text>
          <Text>{partner.website}</Text>
          <Text>{partner.phone}</Text>
          <Text>{partner.email}</Text>
        </View>
        <View style={styles.findUs}>
          <Text>Find us on:</Text>
          <Text>fb</Text>
          <Text>tw</Text>
        </View>
        <HTMLView value={partner.description} style={{flex: 1, width: 100 }}/>
        <Map locations={partner.venues} style={{ flex: 1, height: 200 }}/>
    	</ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  contact: {
    flex: 1,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
  findUs: {
    flex: 1,
    width: 100,
  }
})

module.exports = PartnerAbout
