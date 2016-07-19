/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import WebViewBridge from 'react-native-webview-bridge';
import { Actions } from 'react-native-router-flux';

export default class VbWebView extends Component {

  render() {
    return (
      <WebViewBridge
        ref="webviewbridge"
        source={{uri: this.props.uri}}/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
