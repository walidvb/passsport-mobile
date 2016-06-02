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
} from 'react-native';
var baseStyles = require('../styles')


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
      }),
      loaded: false,
    }
    this.props.getPartners();
  }

  render() {
    if(!this.state.loaded || !this.state.dataSource.length){
      return (
        <View style={baseStyles.container}>
          <Text>
            Loading partners...
          </Text>
        </View>
      );
    }
    return (
      <ListView
        automaticallyAdjustContentInsets={true}
        style={[styles.partnersList]}
        dataSource={this.state.dataSource}
        renderRow={this.renderPartnerCell}
      />
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
    backgroundColor: '#0074D9',
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
