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
    const { partner, noValidateBanner, smallCell } = this.props;
    const goToPartner = () => {
      Actions.partnerShow({title: partner.name, id: partner.id})
    }

    const validBanner = noValidateBanner ? null : partner.validated ? <ValidBanner/> : null
    const customStyles = this.props.smallCell ? { height: 18*7 } : {}
    return (
      <TouchableHighlight
      style={[styles.partnerCell, , {flexDirection: 'row'}]}
      onPress={goToPartner}
      underlayColor={colors.brand}
      activeOpacity={0.3}>
        <OverlayImage
          source={{uri: partner.tile_image}}
          style={[this.props.style, customStyles]}
          overlayStyle={[styles.overlay]}>
          {validBanner}
          <VbText styles={['large', 'light', 'bold']} uppercase text={partner.name}/>
          <View style={styles.partnerCategories}>
            {partner.categories.map((cat) => {
              return (<VbText style={{paddingRight: 15}} styles={['light','small']} lowercase key={cat + partner.name} text={'#'+cat}/>)
            })}
          </View>
        </OverlayImage>
      </TouchableHighlight>
    )
  }
};

const styles = StyleSheet.create({
  overlay: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingLeft: 15,
    paddingBottom: 25,
  },
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
  partnerCell: {
    marginBottom: 18,
  },
  partnerCategories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 9,
  },
})

module.exports = PartnerCell
