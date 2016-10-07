import React, { Component } from 'react';
import { TouchableHighlight, View, Text, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';

var baseStyles = require('../styles')
import colors from '../colors'
const OverlayImage = require('../helpers/overlayImage')
const VbText = require('../helpers/vbText')
import ValidBanner from './_partnerValidBanner'

class PartnerCell extends Component{
  render() {
    const { partner, smallCell } = this.props;
    const goToPartner = () => {
      Actions.partnerShow({id: partner.id})
    }

    const validBanner = partner.validated ? <ValidBanner/> : null
    const customStyles = this.props.smallCell ? { height: 18*7 } : {}

    const catStyles = ['small', 'light']
    const insideStyles = [styles.overlay, this.props.style]

    const inside = (
      <View style={insideStyles}>
        <VbText styles={['large', 'light', 'bold']} uppercase text={partner.name}/>
        <View style={styles.partnerCategories}>
          {partner.categories.map((cat) => {
            return (<VbText style={styles.categorySingle} styles={catStyles} lowercase key={cat.slug + partner.name} text={'#'+cat.name}/>)
          })}
        </View>
      </View>
    );
    return (
      <TouchableHighlight
      style={[styles.partnerCell, {flexDirection: 'row'}, this.props.noImage ? styles.noImage : null]}
      onPress={goToPartner}
      underlayColor={colors.brand}
      activeOpacity={0.3}>
      {!this.props.noImage ? (
        <OverlayImage
        source={{uri: partner.tile_image}}
        style={[this.props.style, customStyles]}
        overlayStyle={[styles.overlay]}>
          {validBanner}
          {inside}
        </OverlayImage>) :
      inside}
      </TouchableHighlight>
    )
  }
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    paddingLeft: 15,
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
    marginBottom: 18,
  },
  partnerCategories: {
    flex: 1,
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
