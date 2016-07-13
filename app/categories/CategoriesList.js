/* @flow */

import React, { Component } from 'react';
import {
  ListView,
  Text,
  StyleSheet,
  TextInput
} from 'react-native';
import colors from '../colors'
const VbText = require('../helpers/vbText')

export default class CategoriesList extends Component {
  componentWillMount() {
    this.state = {
      categories: [],
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      ...this.props,
    }
  }

  componentDidMount() {
     this.setState({
       ...this.state,
       categories: this.props.categories,
       dataSource: this.state.dataSource.cloneWithRows(this.props.categories),
     })
  }
  componentWillReceiveProps(props){
    if(this.state.categories !== props.categories){
      this.setState({
        ...this.state,
        categories: props.categories,
        dataSource: this.state.dataSource.cloneWithRows(props.categories),
      });
    }
  }
  render() {
    if(!this.state.categories.length){
      return <VbText>LOADING</VbText>
    }
    return (
      <ListView
        style={[this.props.style, styles.container]}
        automaticallyAdjustContentInsets={true}
        dataSource={this.state.dataSource}
        renderRow={this.renderCategoryCell.bind(this)}
        renderHeader={this.renderHeader.bind(this)}
        enableEmptySections={true}
      />
    );
  }
  renderCategoryCell(category){
    return (
      <VbText uppercase style={styles.category} text={category}>{category}</VbText>
    )
  }
  renderHeader(){
     return(
       <TextInput style={styles.search} ref='search' onChangeText={this.search.bind(this)} placeholder='SEARCH'/>
    )
  }
  search(query){
    console.log(query);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,

  },
  category: {
    paddingBottom: 10,
    marginBottom: 10,
  },
  search: {
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
    height: 60,
  }
});
