'use strict';
import React, { Component } from 'react';
import { StyleSheet, ListView, Text, TextInput, View, TouchableHighlight } from 'react-native';
var baseStyles = require('../styles');
import FormErrors from '../utils/ResponseErrors';

const t = require('tcomb-form-native');
const Form = t.form.Form;
const tEmail = t.subtype(t.Str, function (s) {
  return /@/i.test(s);
});
let existingUser = t.struct({
  email: tEmail,
  password: t.String
});
let newUser = t.struct({
  email: tEmail,
  password: t.String,
  password_confirmation: t.String,
});
let options = {
  auto: 'placeholders',
  fields: {
    email: {
      error: 'Please insert a valid email address',
    },
    password: {
      password: true,
      secureTextEntry: true,
    },
    password_confirmation: {
      password: true,
      secureTextEntry: true,
    },
  }
}

class UserForm extends Component{
  constructor(props) {
    super(props);
    this.state={
      newUser: true,
      formOptions: options,
    };
    this.props.clearErrors();
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
    return(
      <View>
        <FormErrors errors={this.props.ui.errors}/>
        {this.state.newUser ? this.renderSignIn() : this.renderSignUp()}
      </View>
    );
  }
  _signIn(){
    this.props.clearErrors()
    var value = this.refs.form.getValue();
    if(value){
      this.props.signIn(value);
    }
  }
  _signUp(){
    this.props.clearErrors()
    var value = this.refs.formUp.getValue();
    if(value){
      this.props.signUp(value);
    }
  }
  renderSignIn(){
    return (
      <View style={[{flex: 1, paddingLeft: 5, paddingRight: 5, flexDirection: 'column'}]}>
        <Form
          ref='form'
          type={existingUser}
          value={this.state.value}
          options={this.state.formOptions}
        />
        <TouchableHighlight style={baseStyles.button} onPress={this._signIn.bind(this)} underlayColor='#99d9f4'>
          <Text style={baseStyles.buttonText}>Sign In</Text>
        </TouchableHighlight>
        <Text onPress={() => this.setState({newUser: false})}>New member? Sign up</Text>
      </View>
    );
  }
  renderSignUp(){
    return (
      <View style={[{flex: 1, paddingLeft: 5, paddingRight: 5, flexDirection: 'column'}]}>
        <Form
          ref='formUp'
          type={newUser}
          value={this.state.value}
          options={this.state.formOptions}
        />
        <TouchableHighlight style={baseStyles.button} onPress={this._signUp.bind(this)} underlayColor='#99d9f4'>
          <Text style={baseStyles.buttonText}>Sign Up</Text>
        </TouchableHighlight>
        <Text onPress={() => this.setState({...this.state, newUser: true})}>Already a member? Sign in</Text>
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
  }
})

export default UserForm
