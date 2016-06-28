import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
var baseStyles = require('../styles')
const HTMLView = require('react-native-htmlview')
const Map = require('../components/Map')

class GetPass extends Component{

  render() {
    const { partner } = this.props;
    console.log(partner);
    return (
    	<View>
        <View style={styles.categories}>
          {partner.categories.map((cat) => {
            return (
              <Text style={styles.cat} key={cat}>{cat}</Text>
            )
          })}
        </View>
        <HTMLView value={partner.offer_details} style={{}}/>
    	</View>
    );
  }
};

const styles = StyleSheet.create({
  categories: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    paddingBottom: 18,
    paddingTop: 18,
    paddingLeft: 15,
    paddingLeft: 15,
  },
  cat: {

  },
})

module.exports = GetPass
