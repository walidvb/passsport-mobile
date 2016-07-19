import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

import colors from '../colors'
var baseStyles = require('../styles')
const VbHTMLView = require('../helpers/vbHTMLView')
const Map = require('../components/Map')
const VbText = require('../helpers/vbText')
class PartnerOffer extends Component{
  render() {
    const { partner } = this.props;
    console.log(partner);
    return (
    	<ScrollView>
        <View style={styles.discount}>
          <VbHTMLView value={partner.discount} stylesheet={discountStyles}/>
        </View>
        <View style={[styles.categories]}>
          {partner.categories.map((cat) => {
            return (
              <VbText style={styles.cat} key={cat} text={cat} uppercase styles={['bold']}></VbText>
            )
          })}
        </View>
        <View style={baseStyles.element}>
          <VbText text='Discount' uppercase styles={['bold']} style={baseStyles.title}/>
          <VbHTMLView value={partner.offer_details} />
        </View>
    	</ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  categories: {
    borderBottomColor: colors.lightGray,
    borderBottomWidth: 1,
    paddingBottom: 27,
    paddingTop: 27,
    marginRight: 18,
    marginLeft: 18,
    marginBottom: 18,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cat: {
    marginRight: 9,
  },
  discount: {
    backgroundColor: colors.red,
    alignItems: 'center',
    paddingTop: 18,
    paddingBottom: 18,
    marginTop: 18,
  }
})

const color = colors.white
const discountStyles = StyleSheet.create({
  p: {
    color,
  },
  strong: {
    color,
    fontWeight: 'bold',
    fontSize: 22.5
  },
  span: {
    color,
  },

})

module.exports = PartnerOffer
