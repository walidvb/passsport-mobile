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
  transformedCats(categories, selected){
    return categories.map((cat) => {
      return {
        name: cat,
        active: selected.includes(cat),
      }
    })
  }
  componentDidMount() {
    const cats = this.transformedCats(this.props.categories, this.props.ui.filters.categories)
     this.setState({
       ...this.state,
       categories: cats,
       dataSource: this.state.dataSource.cloneWithRows(cats),
     })
  }
  componentWillReceiveProps(props){
    const transformedCats = this.transformedCats(props.categories, props.ui.filters.categories)
    if(this.state.categories !== transformedCats){
      this.setState({
        ...this.state,
        categories: transformedCats,
        dataSource: this.state.dataSource.cloneWithRows(transformedCats),
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
      <VbText
        onPress={() => this.props.toggleCategory(category.name)}
        uppercase
        brandColor={category.active}
        bold={category.active}
        style={styles.category}
        text={category.name} />
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
