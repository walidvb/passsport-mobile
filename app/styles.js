import {
  StyleSheet,
} from 'react-native';

import colors from './colors'

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: "stretch",
    paddingLeft: 15,
    paddingRight: 15,
  },
});

module.exports = Styles;
