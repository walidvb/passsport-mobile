const PARTNER_LIST = [
  {
    name: 'Dirt King',
    category: 'bike',
    image: 'http://placehold.it/500',
  },
];

'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  ListView,
  Text,
  View,
} from 'react-native';
var baseStyles = require('../styles')


class PartnersList extends Component{
  constructor(props) {
    super(props);
  }
  componentWillMount() {
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
      dataSource: this.state.dataSource.cloneWithRows(PARTNER_LIST)
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
    return (
      <ListView
        style={[styles.partnersList, {flex: 1, backgroundColor: 'red'}]}
        dataSource={this.state.dataSource}
        renderRow={this.renderPartnerCell}
      />
    );
  }
  renderPartnerCell(partner){
    return (
      <View style={styles.partnerCell}>
        <Text>{partner.name}</Text>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  partnersList: {
    paddingTop: 20,
    flex: 1,
  },
  partnerCell: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
    backgroundColor: '#0074D9',
  }
})
module.exports = PartnersList
