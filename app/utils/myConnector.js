import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as uiActionCreators from './uiActionCreators'
export default function(component, actionCreators, stateKeys = ['partners', 'auth']){

  // add UI if not present
  stateKeys.indexOf('ui') < 0 ? stateKeys.push('ui') : null;

  function mapStateToProps(state){
    let mapping = {};
    stateKeys.forEach((key) => mapping[key] = state[key]);
    return mapping;
  }

  function mapDispatchToProps(dispatch){
    let actions = {}
    console.log(typeof(actionCreators), actionCreators);
    if(typeof actionCreators == 'Array'){
      for(let i = 0; i < actionCreators.length; i++){
        actions = Object.assign(actions, actionCreators[i])
      }
    }
    else{
      actions = actionCreators;
    }
    return bindActionCreators({...actions, ...uiActionCreators}, dispatch);
  }

  component = connect(mapStateToProps, mapDispatchToProps)(component);
  return component;
}
