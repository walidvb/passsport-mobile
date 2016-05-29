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
        </View>
      )
    }
    return this.state.newUser ? this.renderSignIn() : this.renderSignUp();
  }
  renderSignIn(){
    return (
      <View style={[{flex: 1, paddingLeft: 5, paddingRight: 5, flexDirection: 'column'}]}>
        <TextInput autoFocus keyboardType='email-address' placeholder='Email' style={styles.input} onChangeText={(emaail) => this.setState({emaail})}></TextInput>
        <TextInput placeholder='Password' secureTextEntry={true} style={styles.input} onChangeText={(password) => this.setState({password})}></TextInput>
        <TouchableHighlight>
          <Text>
            LOG IN
          </Text>
        </TouchableHighlight>
        <Text onPress={() => this.setState({newUser: false})}>Already a member? Sign in</Text>
      </View>
    );
  }
  renderSignUp(){
    return (
      <View style={[{flex: 1, paddingLeft: 5, paddingRight: 5, flexDirection: 'column'}]}>
        <TextInput autoFocus keyboardType='email-address' placeholder='Email' style={styles.input} onChangeText={(email) => this.setState({email})}></TextInput>
        <TextInput placeholder='Password' secureTextEntry={true} style={styles.input} onChangeText={(password) => this.setState({password})}></TextInput>
        <TextInput placeholder='Password Confirmation' secureTextEntry={true} style={styles.input} onChangeText={(passwordConfirmation) => this.setState({passwordConfirmation})}></TextInput>
        <TouchableHighlight>
          <Text>
            SIGN UP
          </Text>
        </TouchableHighlight>
        <Text onPress={() => this.setState({newUser: true})}>New member? Sign up</Text>
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
    //borderBottomWidth: 1, borderBottomColor: 'grey'
  }
})

export default UserForm
