import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, Platform } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';

import colors from '../colors'
var baseStyles = require('../styles')
const VbHTMLView = require('../helpers/vbHTMLView')
const Map = require('../components/Map')
const VbText = require('../helpers/vbText')
class PartnerOffer extends Component{
  renderCategory(cat){
    const onPress = () => {
      Actions.home({type: ActionConst.RESET});
      this.props.toggleCategory(cat.name, true);
    }
    return (
      <VbText onPress={onPress.bind(this)} style={styles.cat} key={cat.name} text={cat.name} uppercase styles={['bold']}></VbText>
    )
  }
  render() {
    const { partner } = this.props;
    return (
    	<View>
        <View style={styles.discount}>
          <VbHTMLView value={partner.discount} stylesheet={discountStyles}/>

        </View>
        <View style={[styles.categories]}>
          {partner.categories.map(cat => this.renderCategory(cat))}
        </View>
        <View style={baseStyles.element}>
          <VbHTMLView value={partner.offer_details} />
        </View>
    	</View>
    );
  }
};

const styles = StyleSheet.create({
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderBottomColor: colors.lightGray,
    borderBottomWidth: 1,
    paddingBottom: 18,
    paddingTop: 27,
    marginRight: 18,
    marginLeft: 18,
    marginBottom: 18,
  },
  cat: {
    marginRight: 9,
    marginBottom: 9,
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
    textAlign: 'center',
    flex: 1,
    fontFamily: 'Lato',
  },
  strong: {
    color,
    fontFamily: Platform.OS==='android' ? 'LatoBold' : 'Lato-Bold',
    textAlign: 'center',
    fontSize: 22.5
  },
  span: {
    textAlign: 'center',
    fontFamily: 'Lato',
    color,
  },

})

module.exports = PartnerOffer
