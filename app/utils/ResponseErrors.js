import React, { Component } from 'react';
import { View, Text } from 'react-native';
import _ from 'lodash';

class FormErrors extends Component{
  render() {
    const that = this;
    if(!this.props.errors){ return null };
  	let errors = _.keys(this.props.errors).map(function(key){
      const _er = that.props.errors[key];
  		var messages = (typeof(_er) == 'string') ? (<Text>{_er}</Text>) : _er.map((msg) => (<Text>{key} {msg}</Text>));
  		return (
  			<View>
  				{messages}
  			</View>
  		)
  	});
    return (
    	<View>
    		{errors}
    	</View>
    );
  }
};

export default FormErrors
