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
const OverlayImage = require('../helpers/overlayImage');

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
        <OverlayImage
          source={{uri: partner.tile_image}}
          style={styles.partnerCell}
          overlayStyle={styles.overlay}>
          <VbText light large bold uppercase style={styles.partnerName} text={partner.name}/>
          <View style={styles.partnerCategories}>
            {partner.categories.map((cat) => {
              return (<VbText style={{marginRight: 5}} light small lowercase key={cat} text={cat}/>)
            })}
          </View>
        </OverlayImage>
      </TouchableHighlight>
    )
  }
};

const styles = StyleSheet.create({
  overlay: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingLeft: 15,
    paddingBottom: 25,
  },
  partnersList: {
    flex: 1,
  },
  partnerCell: {
    marginTop: 18,
    marginLeft: 18,
    marginRight: 18,
  },
  partnerCategories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 9,
  },
})

import myConnector from '../utils/myConnector'
import * as partnerActions from './partnersActionCreators';
PartnersList = myConnector(PartnersList, partnerActions, ['partners']);

module.exports = PartnersList
