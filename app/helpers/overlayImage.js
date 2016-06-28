import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';

class OverlayImage extends Component{
  setNativeProps(nativeProps) {
    this._root.setNativeProps(nativeProps);
  }
  render() {
    return (
      <View
        ref={(component) => this._root = component}
        style={[styles.base, this.props.style]}>
        <Image
          source={this.props.source}
          style={{flex: 1}}
          resizeMode="cover"
        >
          <View style={styles.overlay}>
            {this.props.children}
          </View>
        </Image>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  base: {
    alignItems: 'stretch',
    flex: 1,
    height: 200
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'flex-end',
    paddingLeft: 15,
    paddingBottom: 25,
  },
})

module.exports = OverlayImage
