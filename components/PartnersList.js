const PARTNER_LIST = [
  {
    name: 'Dirt King',
    category: 'bike',
    image: 'http://placehold.it/500',
  }
];

'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  ListView,
  Text,
  View,
} from 'react-native';
var styles = require('./styles')

const LoadingView = (
  <View style={styles.container}>
    <Text>
      Loading movies...
    </Text>
  </View>
)

let PartnersList = React.createClass({
  componentWillMount: () => {
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    }
  },
  fetchData: () => {
    this.setState({
      loaded: true,
      dataSource: this.state.dataSource.cloneWithRows(PARTNER_LIST)
    });
  },
  componentDidMount: () => {
    this.fetchData();
  },
  render: () => {
    if(this.state.loaded){
      return (<LoadingView></LoadingView>);
    }
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderPartnerCell}
      >
        asd
      </ListView>
    );
  },
  renderPartnerCell: (partner) => {
    return (
      <Text>{partner.name}</Text>
    )
  }
});

module.exports = PartnersList
