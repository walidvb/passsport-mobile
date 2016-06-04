'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  ListView,
  Text,
  TextInput,
  View,
  TouchableHighlight,
} from 'react-native';
var baseStyles = require('../styles')


class UserForm extends Component{
  constructor(props) {
    super(props);
    this.state={
      newUser: true
    };
  }
  render() {
    if(this.props.auth.loggedIn){
      return (
        <View style={baseStyles.container}>
          <Text>You're logged in!</Text>
          <TouchableHighlight style={baseStyles.button} onPress={this.props.signOut}>
            <Text>LOG OUT</Text>
          </TouchableHighlight>
        </View>
      )
    }
    return this.state.newUser ? this.renderSignIn() : this.renderSignUp();
  }
  _signIn(){
    console.log(this.state);
    const email = this.state.email;
    const password = this.state.password;
    this.props.signIn({email, password});
  }
  renderSignIn(){
    return (
      <View style={[{flex: 1, paddingLeft: 5, paddingRight: 5, flexDirection: 'column'}]}>
        <TextInput
          autoFocus
          keyboardType='email-address'
          placeholder='Email'
          style={styles.input}
          ref='email'
          onChangeText={(email) => this.setState({email})}/>
        <TextInput
          ref="password"
          placeholder='Password'
          secureTextEntry={true}
          style={styles.input}
          onChangeText={(password) => this.setState({password})}/>
        <TouchableHighlight
          style={baseStyles.button}
          onPress={this._signIn.bind(this)}>
          <Text style={baseStyles.buttonInner}>
            LOG IN
          </Text>
        </TouchableHighlight>
        <Text onPress={() => this.setState({newUser: false})}>New member? Sign up</Text>
      </View>
    );
  }
  renderSignUp(){
    return (
      <View style={[{flex: 1, paddingLeft: 5, paddingRight: 5, flexDirection: 'column'}]}>
        <TextInput autoFocus keyboardType='email-address' placeholder='Email' style={styles.input} onChangeText={(email) => this.setState({email})}></TextInput>
        <TextInput placeholder='Password' secureTextEntry={true} style={styles.input} onChangeText={(password) => this.setState({password})}></TextInput>
        <TextInput placeholder='Password Confirmation' secureTextEntry={true} style={styles.input} onChangeText={(passwordConfirmation) => this.setState({passwordConfirmation})}></TextInput>
        <TouchableHighlight
          style={baseStyles.button}
          onPress={this._signIn.bind(this)}>
          <Text style={baseStyles.buttonInner}>
            SIGN UP
          </Text>
        </TouchableHighlight>
        <Text onPress={() => this.setState({newUser: true})}>Already a member? Sign in</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: 'grey',
    paddingLeft: 5,
    marginBottom: 5,
    //borderBottomWidth: 1, borderBottomColor: 'grey'
  }
})

// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
// function mapStateToProps(state){
//   return {
//     auth: state.auth,
//     partners: state.partners
//   }
// }
//
// function mapDispatchToProps(dispatch){
//   return bindActionCreators({...authActionCreators}, dispatch);
// }
//
//
// import * as authActionCreators from './authActionCreators';
//
// UserForm = connect(mapStateToProps, mapDispatchToProps)(UserForm);
//
export default UserForm
