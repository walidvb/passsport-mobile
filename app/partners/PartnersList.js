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
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    }
  }
  fetchData() {
    this.setState({
      loaded: true,
      dataSource: this.state.dataSource.cloneWithRows(this.props.partners)
    });
  }
  componentDidMount() {
    this.fetchData();
  }
  render() {
    if(!this.state.loaded){
      return (
        <View style={baseStyles.container}>
          <Text>
            Loading movies...
          </Text>
        </View>
      );
    }
    const test = () => console.log('test');
    return (
      <ListView
        automaticallyAdjustContentInsets={true}
        style={[styles.partnersList]}
        dataSource={this.state.dataSource}
        renderRow={this.renderPartnerCell}
        onPress={test}
      />
    );
  }
  renderPartnerCell(partner){
    const goToPartner = () => {
      Actions.partnerShow({id: partner.id})
    }
    return (
      <TouchableHighlight style={styles.partnerCell} onPress={goToPartner}>
        <View>
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
PartnersList = myConnector(PartnersList, [], ['partners']);

module.exports = PartnersList
