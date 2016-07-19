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
  <VbIcon name="check" style={styles.container} size={27}/>
);

export default ValidBanner;

const styles = StyleSheet.create({
  container: {
    color: 'white',
    flex: 1,
    backgroundColor: colors.red,
    padding: 20,
    position: 'absolute',
    top: 0,
    right: 20,
    alignItems: 'center',

  },
});
