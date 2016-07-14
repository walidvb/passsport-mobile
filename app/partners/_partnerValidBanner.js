/* @flow weak */

import React from 'react';
import colors from '../colors'
const VbIcon = require('../helpers/vbIcon')
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const ValidBanner = ({}) => (
  <VbIcon name="check" style={styles.container} size={24}/>
);

export default ValidBanner;

const styles = StyleSheet.create({
  container: {
    color: 'white',
    flex: 1,
    backgroundColor: colors.brand,
    padding: 15,
    position: 'absolute',
    top: 0,
    right: 15,
    alignItems: 'center',

  },
});
