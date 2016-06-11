'use strict';
import React, { Component } from 'react';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';


import {
  StyleSheet,
  View,
  Text,
} from 'react-native'
var baseStyles = require('../styles')
import MapView from 'react-native-maps';

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
  render() {
    const { locations } = this.props;
    if(!locations || !locations.length){ return null; }
    return (
      <MapView
        style={this.props.style}
        region={this.getRegion(locations)}
        showsUserLocation={true}
      >
        {locations.map((marker, i) => {
          const laglng = { latitude: parseFloat(marker.latitude),longitude: parseFloat(marker.longitude) };
          const { address } = marker;
          return (<MapView.Marker
            key={i}
            description={address}
            coordinate={laglng}
          />)
        })}
      </MapView>
    );
  }
};

const styles = StyleSheet.create({
})

import myConnector from '../utils/myConnector'


module.exports = Map
