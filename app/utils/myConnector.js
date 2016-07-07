import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
export default function(component, actionCreators, stateKeys = ['partners', 'auth']){

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
    return bindActionCreators({...actions}, dispatch);
  }

  component = connect(mapStateToProps, mapDispatchToProps)(component);
  return component;
}
