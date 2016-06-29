import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../colors'

class VbIcon extends Component{

  render() {
    return (
    	<Icon style={this.props.style} name={this.props.name} size={this.props.style.size || 16} color={this.props.style.color || colors.lightGray} />
    );
  }
};

module.exports = VbIcon
