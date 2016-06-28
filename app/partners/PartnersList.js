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
var baseStyles = require('../styles');
const VbText = require('../helpers/vbText');

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
          <VbText text="Loading partners..."/>
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
            source={{uri: partner.tile_image}}
            style={styles.thumbnail}
            resizeMode="cover"
          >
            <View style={styles.overlay}>
              <VbText light large bold uppercase style={styles.partnerName} text={partner.name}/>
              <View style={styles.partnerCategories}>
                {partner.categories.map((cat) => {
                  return (<VbText style={{marginRight: 5, }} light small lowercase key={cat} text={cat}/>)
                })}
                </View>
            </View>
          </Image>
        </View>
      </TouchableHighlight>
    )
  }
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'flex-end',
    paddingLeft: 15,
    paddingBottom: 25,
  },
  partnersList: {
    flex: 1,
  },
  partnerName: {

  },
  partnerCell: {
    alignItems: 'stretch',
    flex: 1,
    //flexDirection: 'column',
    marginTop: 18,
    marginLeft: 18,
    marginRight: 18,
  },
  partnerCategories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 9,
    //flex: 1,
  },
  thumbnail: {
    height: 200,
    flex: 1,

  }
})

import myConnector from '../utils/myConnector'
import * as partnerActions from './partnersActionCreators';
PartnersList = myConnector(PartnersList, partnerActions, ['partners']);

module.exports = PartnersList
