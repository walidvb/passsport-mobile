import React, { Component } from 'react';
import { Dimensions, View, Image, StyleSheet } from 'react-native';

class OverlayImage extends Component{
  setNativeProps(nativeProps) {
    this._root.setNativeProps(nativeProps);
  }
  render() {
    const alignItems = this.props.alignItems ? this.props.alignItems : 'center'
    return (
      <View
        ref={(component) => this._root = component}
        style={[styles.base, this.props.style]}>
        <Image
          source={this.props.source}
          style={{flex: 1}}
          resizeMode="cover"
        >
          <View style={[styles.overlay, this.props.overlayStyle]}>
            {this.props.children}
          </View>
        </Image>
      </View>
    );
  }
};

const height = Dimensions.get('window').width <= 460 ? 18*11 : 18*20

const styles = StyleSheet.create({
  base: {
    alignItems: 'stretch',
    flex: 1,
    height,
  },
  overlay: {
    paddingLeft: 9,
    paddingRight: 9,
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
})

module.exports = OverlayImage
