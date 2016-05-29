import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as authActionCreators from './auth/authActionCreators';

import Main from './Main'

function mapStateToProps(state){
  return {
    auth: state.auth,
    partners: state.partners
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(authActionCreators, dispatch);
}

const App = connect(mapStateToProps, mapDispatchToProps)(Main);

export default App;
