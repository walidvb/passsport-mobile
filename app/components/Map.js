'use strict';
import React, { Component } from 'react';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';


import {
  StyleSheet,
  View,
  Text,
  MapView,
} from 'react-native'
var baseStyles = require('../styles')
var Button = require('react-native-button');

class Map extends Component{
  getRegion(locations, center){
    let myLatlng = {};
  	if(center == null) {
  		let centerLat = 0;
  		let centerLong = 0;
  		for(var i = 0; i < locations.length; i++) {
  			centerLat += parseFloat(locations[i].latitude);
  			centerLong += parseFloat(locations[i].longitude);
  		}
  		const latitude = centerLat / locations.length;
  		const longitude = centerLong / locations.length;
      const latitudeDelta =  0.0622;
      const longitudeDelta =  0.0521;
      return { latitude, longitude, latitudeDelta, longitudeDelta }
  	}
  }
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    console.log(this.props);
  }
  render() {
    const { locations } = this.props;
    if(!locations.length){ return null; }

    console.log(this.getRegion(locations));
    return (
      <View>
      <MapView style={this.props.style} region={this.getRegion(locations)}>
      {locations.map((marker, i) => {
        const laglng = { latitude: parseFloat(marker.latitude),longitude: parseFloat(marker.longitude) };
        console.log(laglng);
        return (<MapView.Marker
          key={i}
          title={'test'}
          description={'testa'}
          coordinate={laglng}
        />)
      })}
      </MapView>
        <Text>
          {this.getRegion(locations).latitude}, {this.getRegion(locations).longitude}
        </Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
})

import myConnector from '../utils/myConnector'


module.exports = Map
