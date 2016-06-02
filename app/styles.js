import {
  StyleSheet,
} from 'react-native';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: "stretch",
  },
  button: {
    height: 30,
    borderWidth: 1,
    backgroundColor: 'cornflowerblue',
    borderColor: 'darkblue',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  buttonInner: {
    color: 'white',
    textAlign: 'center',
  }
});

module.exports = Styles;
