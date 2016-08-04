/* @flow */

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Navigator,
} from 'react-native';
import WebViewBridge from 'react-native-webview-bridge';
import { Actions } from 'react-native-router-flux';
import RequiresConnection from 'react-native-offline-mode';

class VbWebView extends Component {

  render() {
    return (
      <View style={{flex: 1, paddingTop: Navigator.NavigationBar.Styles.General.TotalNavHeight}}>
        <WebViewBridge
          ref="webviewbridge"
          source={{uri: this.props.uri}}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default  RequiresConnection(VbWebView, "Oops, it seems like you're not connected to the internet. Please try again later!")
