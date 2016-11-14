import {
  StyleSheet,
  Platform,
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
    paddingTop: 15,
    paddingBottom: 15,
  },
  element: {
    marginBottom: 18,
    paddingLeft: 15,
    paddingRight: 15,
  },
  title: {
    fontFamily: Platform.OS==='android' ? 'LatoBold' : 'Lato-Bold',
    color: 'white',
    fontSize: 18,
    marginBottom: 18,
  },
  text:{
    fontFamily: 'Lato',
  },
  bold: {
    fontFamily: Platform.OS==='android' ? 'LatoBold' : 'Lato-Bold',
  },
  centered: {
    textAlign: 'center',
  },
});

module.exports = Styles;
