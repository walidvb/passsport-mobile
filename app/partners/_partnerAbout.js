import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
var baseStyles = require('../styles')
import colors from '../colors'

const VbHTMLView = require('../helpers/vbHTMLView')
const Map = require('../components/Map')
const VbText = require('../helpers/vbText')
const VbLink = require('../helpers/vbLink')
const VbIcon = require('../helpers/vbIcon')

function urlWithIcon(icon, text, url){
  if(!text){return null}
  const isUrl = /https?:\/\/([^\/]+)/.exec(text)
  const renderedText = isUrl ? isUrl[1] : text
  return (
    <View style={styles.contactRow}>
      <VbIcon style={styles.icon} name={icon}/>
      <VbLink url={url || text} style={{flex: 1}}>
        <VbText text={renderedText} />
      </VbLink>
    </View>
  )
}
function findUs(partner){
  return (!partner.facebook && !partner.twitter) ? null : (<View style={[baseStyles.element, styles.findUs]}>
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
}
class PartnerAbout extends Component{
  render() {
    const { partner } = this.props;

    return (
    	<View style={styles.container}>
        <View style={styles.contact}>
          {urlWithIcon('map-marker', partner.contact)}
          {urlWithIcon('phone', partner.phone, "tel:"+partner.phone)}
          {urlWithIcon('globe', partner.website)}
          {urlWithIcon('envelope', partner.email, "mailto:"+partner.email)}

        </View>
        {findUs(partner)}
        <View style={baseStyles.element}>
          <VbHTMLView value={partner.description} />
        </View>
        <Map locations={partner.venues} style={{ flex: 1, height: 150 }}/>
    	</View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    paddingTop: 18,
  },
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
    marginBottom: 13.5,
    flex: 1,
  },
  findUs: {
    flexDirection: 'row',
    marginBottom: 27,
  },
  icon: {
    color: colors.lightGray,
    marginRight: 13.5,
    width: 18,
    textAlign: 'center'
  }
})

module.exports = PartnerAbout
