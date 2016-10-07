
/* @flow */

import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux'

import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  AsyncStorage,
} from 'react-native';

const VbIcon = require('../helpers/vbIcon')

import Swiper from 'react-native-swiper';

import colors from '../colors'
var {height, width} = Dimensions.get('window');

export default class Introduction extends Component {
  componentWillMount(){
    this.state = {
      screens: [
        require('../resources/images/intro/how-to-1.png'),
        require('../resources/images/intro/how-to-2.png'),
        require('../resources/images/intro/how-to-3.png'),
      ],
      seenLast: false,
    }
  }
  renderCloseIcon(){
    if(this.state.seenLast)
    {
      const close = () => {
        Actions.pop();
        AsyncStorage.setItem('@Static:sawIntro', '1');
      }
      return (<VbIcon
        size={25}
        style={[{color: colors.white, right: 35, position: 'absolute', top: 46, backgroundColor: 'transparent'}]}
        name='thumbs-up'
        onPress={close}
      />)
    }
  }
  checkLast(e, state, context){
    if(!this.state.seenLast){
      this.setState({
        ...this.state,
        seenLast: this.state.seenLast || state.index == state.total-1,
      });
    }
  }
  render() {
    const dotProps = {width: 9.5, height: 9.5, borderRadius: 5, marginLeft: 6, marginRight: 6, marginTop: 6, marginBottom: 6,}
    const dot = <View style={{backgroundColor: '#DADBDD', ...dotProps}} />
    const activeDot = <View style={{backgroundColor: colors.brand, ...dotProps}} />
    return (
      <View style={{backgroundColor: colors.brand}}>
        <Swiper
          dot={dot}
          activeDot={activeDot}
          loop={false}
          bounces={true}
          onMomentumScrollEnd={this.checkLast.bind(this)}
        >
          {this.state.screens.map(src => <Image
            key={src}
            resizeMode='cover'
            style={{height: height, width: width, flex: 1, zIndex: -1}}
            source={src}/>)
          }
        </Swiper>
        {this.renderCloseIcon(this)}
      </View>
    );
  }
}

import myConnector from '../utils/myConnector'
import * as authActions from '../auth/authActionCreators';
Introduction = myConnector(Introduction, authActions);

module.exports = Introduction
