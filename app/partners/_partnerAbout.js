import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
var baseStyles = require('../styles')
import colors from '../colors'

const HTMLView = require('react-native-htmlview')
const Map = require('../components/Map')
const VbText = require('../helpers/vbText')
const VbLink = require('../helpers/vbLink')
const VbIcon = require('../helpers/vbIcon')

function urlWithIcon(icon, text, url){
  if(!text){return null}
  return (
    <View style={styles.contactRow}>
      <VbIcon style={styles.icon} name={icon}/>
      <VbLink url={url || text} style={{flex: 1}}>
        <VbText text={text} />
      </VbLink>
    </View>
  )
}
class PartnerAbout extends Component{
  render() {
    const { partner } = this.props;

    const findUs = (!partner.facebook && !partner.twitter) ? null : (<View style={styles.findUs}>
      <VbText text="Find us on:" style={{
        marginRight: 18
      }}></VbText>
      {(<VbLink url={partner.facebook}>
        <VbIcon style={[styles.icon, {color: colors.black}]} name="facebook"/>
      </VbLink>)}
      {(<VbLink url={partner.twitter}>
        <VbIcon style={[styles.icon, {color: colors.black}]} name="twitter"/>
      </VbLink>)}
    </View>)

    return (
    	<ScrollView style={{flex: 1, flexDirection: 'column', flexWrap: 'wrap'}}>
        <View style={styles.contact}>
          {urlWithIcon('map-marker', partner.contact)}
          {urlWithIcon('globe', partner.website)}
          {urlWithIcon('phone', partner.phone, "tel:"+partner.phone)}
          {urlWithIcon('envelope', partner.email, "mailto:"+partner.email)}

        </View>
        {findUs}
        <View style={baseStyles.element}>
          <VbText text='Presentation' uppercase styles={['bold']} style={baseStyles.title}/>
          <HTMLView
            value={partner.description}
            stylesheet={{}}
          />
        </View>
        <Map locations={partner.venues} style={{ flex: 1, height: 150 }}/>
    	</ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  contact: {
    borderBottomColor: colors.lightGray,
    borderBottomWidth: 1,
    marginLeft: 15,
    marginRight: 15,
    paddingTop: 13.5,
    paddingBottom: 13.5,
    marginBottom: 27,
    flexDirection: 'column',
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 13.5,
  },
  findUs: {
    flexDirection: 'row',
    marginBottom: 27,
    paddingLeft: 15,
    paddingRight: 15,
  },
  icon: {
    color: colors.lightGray,
    marginRight: 13.5,
    width: 18,
    textAlign: 'center'
  }
})

module.exports = PartnerAbout
