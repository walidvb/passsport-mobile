/* @flow */

import React, { Component } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';

import Swiper from 'react-native-swiper';

import colors from '../colors'
var {height, width} = Dimensions.get('window');

const Page = (props) => (
  <Image
    resizeMode='contain'
    style={{height: height, width: width, flex: 1, zIndex: -1}}
    source={require(src)}/>
);

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
  render() {
    const dotProps = {width: 9.5, height: 9.5, borderRadius: 5, marginLeft: 6, marginRight: 6, marginTop: 6, marginBottom: 6,}
    const dot = <View style={{backgroundColor: '#DADBDD', ...dotProps}} />
    const activeDot = <View style={{backgroundColor: colors.brand, ...dotProps}} />
    return (
      <Swiper
        style={styles.wrapper}
        dot={dot}
        activeDot={activeDot}
        loop={false}
         >
        {this.state.screens.map(src => <Image
          key={src}
          resizeMode='contain'
          style={{height: height, width: width, flex: 1, zIndex: -1}}
          source={src}/>)
        }
      </Swiper>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
