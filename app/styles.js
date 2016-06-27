import {
  StyleSheet,
} from 'react-native';

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
  button: {
    height: 30,
    borderWidth: 1,
    backgroundColor: 'cornflowerblue',
    borderColor: 'darkblue',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
    padding: 5,
  },
  buttonInner: {
    color: 'white',
    textAlign: 'center',
  }
});

module.exports = Styles;
