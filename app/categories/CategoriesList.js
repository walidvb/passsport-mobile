/* @flow */

import React, { Component } from 'react';
import {
  ListView,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import colors from '../colors'
const VbText = require('../helpers/vbText')
const VbIcon = require('../helpers/vbIcon')
const VbTextInput = require('../helpers/vbTextInput')

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
    const activeStyle = category.active ? ['bold', 'brand'] : []
    const checkmark = category.active ? <VbIcon name="check" style={{color: colors.brand, marginRight: 4.5}} /> : null
    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
        {checkmark}
        <VbText
          onPress={() => this.props.toggleCategory(category.name)}
          uppercase
          styles={activeStyle}
          style={[styles.category]}
          text={category.name} />
      </View>
    )
  }
  renderHeader(){
     return(
       <VbTextInput style={styles.search} ref='search' onChangeText={this.search.bind(this)} placeholder='SEARCH'/>
    )
  }
  search(query){
    this.props.searchPartners(query.toLowerCase())
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

});
