import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as uiActionCreators from './uiActionCreators'
export default function(component, actionCreators, stateKeys = ['partners', 'auth']){

  stateKeys.indexOf('ui') < 0 ? stateKeys.push('ui') : null;

  function mapStateToProps(state){
    let mapping = {};
    stateKeys.forEach((key) => mapping[key] = state[key]);
    return mapping;
  }

  function mapDispatchToProps(dispatch){
    return bindActionCreators({...actionCreators, clearErrors: uiActionCreators.clearErrors}, dispatch);
  }
  console.log('{...actionCreators, uiActionCreators}', {...actionCreators, ui: uiActionCreators});
  component = connect(mapStateToProps, mapDispatchToProps)(component);
  return component;
}
