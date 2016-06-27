'use strict';
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';

import {
  StyleSheet,
  ListView,
  Text,
  View,
  Image,
  TouchableHighlight,
} from 'react-native'
var baseStyles = require('../styles')


class PartnersList extends Component{
  constructor(props) {
    super(props);
  }
  componentWillMount() {
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
      this.setState({
        ...this.state,
        partners: props.partners,
        dataSource: this.state.dataSource.cloneWithRows(this.props.partners),
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
          renderRow={this.renderPartnerCell}
        />
      )
      return (
        <View style={{flex:1}}>

          {List}
        </View>
      );
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
          {partner.categories.map((cat) => {
            return (<Text>{cat}</Text>)
          })}
          </View>
      </TouchableHighlight>
    )
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
