'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  ListView,
  Text,
  View,
  Image,
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
    return (
      <ListView
        style={[styles.partnersList]}
        dataSource={this.state.dataSource}
        renderRow={this.renderPartnerCell}
      />
    );
  }
  renderPartnerCell(partner){
    return (
      <View style={styles.partnerCell}>
        <Image
          source={{uri: partner.thumbnail}}
          style={styles.thumbnail}
        />
        <Text>{partner.name}</Text>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  partnersList: {
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
module.exports = PartnersList
