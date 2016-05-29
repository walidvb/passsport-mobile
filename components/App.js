import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as authActionCreators from './auth/authActionCreators';

import UserForm from './UserForm'

function mapStateToProps(state){
  return {
    auth: state.auth,
    partners: state.partners
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(authActionCreators, dispatch);
}

const App = connect(mapStateToProps, mapDispatchToProps)(UserForm);
console.log('connect',connect(mapStateToProps, mapDispatchToProps)(UserForm));

export default App;
