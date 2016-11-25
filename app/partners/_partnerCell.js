import React, { Component } from 'react';
import { TouchableHighlight, View, Text, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';

var baseStyles = require('../styles')
import colors from '../colors'
const OverlayImage = require('../helpers/overlayImage')
const VbText = require('../helpers/vbText')
import ValidBanner from './_partnerValidBanner'

class PartnerCell extends Component{
  goToPartner(partner){
    Actions.partnerShow({id: partner.id})
  }
  renderWithImage(partner){
    return (
      <TouchableHighlight
      style={[styles.partnerCell, {flexDirection: 'row'}]}
      onPress={() => this.goToPartner(partner)}
      underlayColor={colors.brand}
      activeOpacity={0.3}>
        <OverlayImage
        source={{uri: partner.tile_image}}
        style={[{flex: 1}]}
        overlayStyle={[styles.overlay]}>
          {partner.validated ? <ValidBanner/> : null}
          <View style={[styles.overlay]}>
            <VbText styles={['large', 'light', 'bold']} uppercase text={partner.name}/>
            <View style={styles.partnerCategories}>
              {partner.categories.map((cat) => {
                return (<VbText style={styles.categorySingle} styles={['small', 'light']} lowercase key={cat.slug + partner.name} text={'#'+cat.name}/>)
              })}
            </View>
          </View>
        </OverlayImage>
      </TouchableHighlight>
    )
  }
  renderTinyCell(partner){
    return (
      <TouchableHighlight
      style={[styles.partnerCell, {flexDirection: 'row'}, styles.noImage]}
      onPress={() => this.goToPartner(partner)}
      underlayColor={colors.brand}
      activeOpacity={0.3}>
      <View style={[styles.overlay]}>
        <VbText styles={['large', 'light', 'bold']} uppercase text={partner.name}/>
        <View style={styles.partnerCategories}>
          {partner.categories.map((cat) => {
            return (<VbText style={styles.categorySingle} styles={['small', 'light']} lowercase key={cat.slug + partner.name} text={'#'+cat.name}/>)
          })}
        </View>
      </View>
      </TouchableHighlight>
    )
  }
  render() {
    const { partner} = this.props;
    return this.props.smallCell ? this.renderTinyCell(partner) : this.renderWithImage(partner);
  }
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 15,
  },
  categories: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    paddingTop: 18,
    paddingLeft: 15,
    paddingLeft: 15,
  },
  categorySingle: {
    paddingRight: 15,
    paddingBottom: 4.5,
  },
  partnerCell: {
    flex: 1,
    marginBottom: 18,
  },
  partnerCategories: {
    flex: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 9,
    alignItems: 'flex-start'
  },
  noImage: {
    backgroundColor: colors.red,
    paddingTop: 18*1.5,
  }
})

module.exports = PartnerCell
