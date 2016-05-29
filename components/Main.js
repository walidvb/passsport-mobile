'use strict';
import React, { Component } from 'react';
import {
  View,
} from 'react-native';

import PartnersList from './partners/PartnersList';
var baseStyles = require('./styles')


class Main extends Component{
  render() {
    return (
      <View style={[{paddingTop: 20}]}>
        <PartnersList {...this.props}></PartnersList>

      </View>
    )
  }
};

export default Main
