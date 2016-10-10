
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

const VbButton = require('../helpers/vbButton')
const baseStyles = require('../styles')

import Swiper from 'react-native-swiper';

import colors from '../colors'

const {height, width} = Dimensions.get('window');

export default class Introduction extends Component {
  componentWillMount(){
    this.state = {
      screens: [
        require('../resources/images/intro/how-to-1.png'),
        require('../resources/images/intro/how-to-2.png'),
        require('../resources/images/intro/how-to-3.png'),
      ],
    }
  }
  renderLastPage(){
    const close = () => {
      Actions.pop();
      AsyncStorage.setItem('@Static:sawIntro', '1');
    }
    return (<View style={styles.lastPage} key="last">
      <Image
        resizeMode='contain'
        style={{height: 120, zIndex: -1, marginBottom: 9}}
        source={require('../resources/images/logo.png')}/>
        <VbButton type={'secondary'} onPress={close}>Découvrir les offres!</VbButton>
      </View>
    )
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
        >
          <Image
            resizeMode='cover'
            style={styles.image}
            source={require('../resources/images/intro/how-to-1.png')}/>
          <Image
            resizeMode='cover'
            style={styles.image}
            source={require('../resources/images/intro/how-to-2.png')}/>
          <Image
            resizeMode='cover'
            style={styles.image}
            source={require('../resources/images/intro/how-to-3.png')}/>
          {this.renderLastPage()}
        </Swiper>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {height: height, width: width, flex: 1, zIndex: -1},
  lastPage: {flex: 1, justifyContent: 'center', alignItems: 'center', padding: 18}
});

import myConnector from '../utils/myConnector'
import * as authActions from '../auth/authActionCreators';
Introduction = myConnector(Introduction, authActions);

module.exports = Introduction
