'use strict';
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';

import {
  StyleSheet,
  ListView,
  View,
  Image,
  ActivityIndicator,
} from 'react-native'

const VbText = require('../helpers/vbText')
var baseStyles = require('../styles');
var colors = require('../colors');

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
        rowHasChanged: (row1, row2) => true || row1 !== row2 || row1.validated != row2.validated,
      }),
      partners: [],
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
    if(true || filteredPartners !== this.state.filteredPartners){
    }
  }
  renderNoResult(){
    return (<View style={[baseStyles.container, {flexDirection: 'column', backgroundColor: 'white'}]}>
              <VbText style={baseStyles.centered}text={"Pas de partenaires correspondants. \n 😓"} styles={['large']}/>
              <VbText style={baseStyles.centered}onPress={() => {
                this.props.toggleCategory(false);
                this.props.searchPartners('');
              }} styles={['underlined']} text="Recommencer à zéro?"/>
            </View>)
  }
  renderLoading(){
    return (<View style={[baseStyles.container, {flexDirection: 'column', backgroundColor: 'white'}]}>
      <VbText style={[baseStyles.centered, { marginBottom: 18 }]} text={"Chargement des partenaires"}/>
      <ActivityIndicator/>
    </View>)
  }
  render() {
      if(!this.state.partners.length){
        return  this.renderLoading()
      }
      else if(!this.state.filteredPartners.length){
        return  this.renderNoResult()
      }
      return (
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
