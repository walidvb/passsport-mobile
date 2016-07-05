import React, { Component } from 'react';
import { TouchableHighlight, View, Text, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';

var baseStyles = require('../styles')

const OverlayImage = require('../helpers/overlayImage')
const VbText = require('../helpers/vbText')


class PartnerCell extends Component{
  render() {
    console.log(this.props)
    const { partner } = this.props;
    const goToPartner = () => {
      Actions.partnerShow({id: partner.id})
    }
    return (
      <TouchableHighlight style={[{flexDirection: 'row'}]} onPress={goToPartner}>
        <OverlayImage
          source={{uri: partner.tile_image}}
          style={[styles.partnerCell, this.props.style]}
          overlayStyle={styles.overlay}>
          <VbText light large bold uppercase style={styles.partnerName} text={partner.name}/>
          <View style={styles.partnerCategories}>
            {partner.categories.map((cat) => {
              return (<VbText style={{marginRight: 5}} light small lowercase key={cat} text={cat}/>)
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
    marginTop: 18,
  },
  partnerCategories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 9,
  },
})

module.exports = PartnerCell
