import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export default function(component, actionCreators, stateKeys = ['partners', 'auth']){

  function mapStateToProps(state){
    let mapping = {};
    stateKeys.forEach((key) => mapping[key] = state[key]);
    console.log(mapping);
    return mapping;
  }

  function mapDispatchToProps(dispatch){
    return bindActionCreators({...actionCreators}, dispatch);
  }

  component = connect(mapStateToProps, mapDispatchToProps)(component);

  return component;
}
