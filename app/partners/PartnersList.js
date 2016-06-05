'use strict';
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';

import {
  StyleSheet,
  ListView,
  Text,
  TextInput,
  View,
  Image,
  TouchableHighlight,
} from 'react-native'
var baseStyles = require('../styles')

function filterPartnersBy(partners, q){
    if(!q || !q.length){
      return partners;
    }
    let selected = [];
    const regExp = new RegExp(q, 'i');
    for(let i = 0; i < partners.length; i++){
      if(regExp.test(partners[i].name) || regExp.test(partners[i].category)){
        console.log(regExp, partners[i].name, partners[i].category);
        selected.push(partners[i])
      }
    }
    return selected
}

class PartnersList extends Component{
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    console.log('partlistprorp', this.props);
    this.state = {
      ...this.props,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2
      }),
      loaded: this.props.loaded,
    }
    this.props.getPartners();

  }

  componentDidMount() {
     this.setState({
       ...this.state,
       partners: this.props.partners,
       dataSource: this.state.dataSource.cloneWithRows(this.props.partners)
     })
  }
  componentWillReceiveProps(props){
    if(this.state.parnters !== props.partners){
      var filteredPartners = filterPartnersBy(props.partners, this.state.query);
      this.setState({
        ...this.state,
        partners: props.partners,
        dataSource: this.state.dataSource.cloneWithRowsAndSections(this._partnersAsBlob(filteredPartners))
      });
    }
  }

  render() {
    const List = !this.state.partners.length ? (
        <View style={baseStyles.container}>
          <Text>
            Loading partners...
          </Text>
        </View>
      ) : (
        <ListView
          automaticallyAdjustContentInsets={true}
          style={[styles.partnersList]}
          dataSource={this.state.dataSource}
          renderHeader={this.renderHeader.bind(this)}
          renderRow={this.renderPartnerCell}
          renderSectionHeader={this.renderSectionHeader}
        />
      )
      return (
        <View style={{flex:1}}>

          {List}
        </View>
      );
  }
  filter(query){
    const filteredPartners = filterPartnersBy(this.props.partners, query);
    this.setState({
      ...this.state,
      query: query,
      dataSource: this.state.dataSource.cloneWithRowsAndSections(this._partnersAsBlob(filteredPartners))
    });

  }
  renderHeader(){
    return(
      <TextInput style={{height: 60, padding: 5,}} ref='search' onChangeText={this.filter.bind(this)} placeholder='Search'/>
    )
  }
  renderSectionHeader(sectionData, sectionID){
    return (
      <View style={{alignItems: 'center', padding: 10, borderBottomColor: '#111', borderBottomWidth: 1} }>
        <Text
          style={{
            color: 'black',
            fontSize: 16,
          }}>
          {sectionID}
        </Text>
        </View>
    )
  }

  renderPartnerCell(partner){
    const goToPartner = () => {
      Actions.partnerShow({id: partner.id})
    }
    return (
      <TouchableHighlight style={{flexDirection: 'row'}} onPress={goToPartner}>
        <View style={styles.partnerCell}>
          <Image
            source={{uri: partner.thumbnail}}
            style={styles.thumbnail}
          />
          <Text>{partner.name}</Text>
          </View>
      </TouchableHighlight>
    )
  }

  _partnersAsBlob(partners){
    if(!partners.length){
      return [];
    }
    var dataBlob = {};
    for(let i = 0; i < partners.length; i++){
      let partner = partners[i];
      dataBlob[partner.category] = dataBlob[partner.category] || []
      dataBlob[partner.category].push(partner)
    }
    return dataBlob;
  }
};

const styles = StyleSheet.create({
  partnersList: {
    flex: 1,
  },
  partnerCell: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  thumbnail: {
    width: 30,
    height: 30,
    margin: 10,
  }
})

import myConnector from '../utils/myConnector'
import * as partnerActions from './partnersActionCreators';
PartnersList = myConnector(PartnersList, partnerActions, ['partners']);

module.exports = PartnersList
