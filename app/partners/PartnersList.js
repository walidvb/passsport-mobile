'use strict';
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';

import {
  StyleSheet,
  ListView,
  View,
  Image,
  TouchableHighlight,
} from 'react-native'

const VbText = require('../helpers/vbText')
var baseStyles = require('../styles');

import filterPartners from './_partnersFilter'

const PartnerCell = require('../partners/_partnerCell')
import partnerValidBanner from './_partnerValidBanner'
import Subscription from '../subscriptions/Subscription'

class PartnersList extends Component{
  constructor(props) {
    super(props);

  }
  componentWillMount() {
    this.state = {
      ...this.props,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: this.props.loaded,
      subscription: new Subscription(this.props.subscription),
    }
  }
  componentDidMount() {
     this.setState({
       ...this.state,
       partners: this.props.partners,
       filteredPartners: this.props.partners,
       dataSource: this.state.dataSource.cloneWithRows(this.props.partners)
     })
  }
  componentWillReceiveProps(props){
    const filteredPartners = filterPartners(props.partners, props.ui.filters)
    this.setState({
      ...this.state,
      filteredPartners,
      partners: props.partners,
      dataSource: this.state.dataSource.cloneWithRows(filteredPartners),
    })
    console.debug(props.partners, filteredPartners.length, this.state.filteredPartners);
    if(true || filteredPartners !== this.state.filteredPartners){
    }
  }

  render() {
    const List = !this.state.partners.length ? (
        <View style={baseStyles.container}>
          <VbText text="Loading partners..."/>
        </View>
      ) : (
        <ListView
          automaticallyAdjustContentInsets={true}
          style={[this.props.style, styles.partnersList]}
          dataSource={this.state.dataSource}
          renderRow={this.renderPartnerCell.bind(this)}
          enableEmptySections={true}
        />
      )
      return (
        <View style={{flex:1}}>
          {List}
        </View>
      );
  }
  renderPartnerCell(partner){
    return (<PartnerCell {...this.props} style={styles.overlay} partner={partner}/>)
  }
};

const styles = StyleSheet.create({
  partnersList: {
    flex: 1,
    paddingTop: 18,
  },

})

module.exports = PartnersList
