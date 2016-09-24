/* @flow */

import React, { Component } from 'react';
import {
  ListView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  dismissKeyboard,
  ActivityIndicator,
} from 'react-native';
import colors from '../colors'
const VbText = require('../helpers/vbText')
const VbIcon = require('../helpers/vbIcon')
const VbTextInput = require('../helpers/vbTextInput')

import Subscription from '../subscriptions/Subscription'

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
    const sub = new Subscription(this.props.subscription)
    const paddingBottom = sub.isValid() ? 0 : 50
    if(!this.state.categories.length){
      return <ActivityIndicator style={{flex: 1, paddingBottom}}/>
    }
    return (
      <ListView
        style={[this.props.style, styles.container, {marginBottom: paddingBottom}]}
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
    const checkmark = category.active ? <VbIcon name="check" style={styles.checkmark} /> : null
    return (
      <TouchableOpacity
        onPress={() => this.props.toggleCategory(category.name)}
      >
        <View style={styles.category}>
          {checkmark}
          <VbText
            uppercase
            styles={activeStyle}
            text={category.name} />
        </View>
      </TouchableOpacity>
    )
  }
  renderHeader(){
    const query = this.props.ui.filters.search;
     return(
       <View>
         <View style={[styles.search, {borderBottomColor: query.length ? colors.brand : colors.lightGray}]}>
           <VbTextInput
            ref='search'
            active={query.length > 0}
            onChangeText={this.search.bind(this)}
            text={this.props.ui.filters.search}
            onSubmitEditing={() => this.props.toggleFilters(false)}
          />
        </View>
        {this.categoriesCount()}
      </View>
    )
  }
  categoriesCount(){
    const catCount = this.props.ui.filters.categories.length
    let categoryCount = "Categories"
    let reset
    if(catCount){
      categoryCount += `   (${catCount})`
      reset = (<VbIcon name={'times'} style={{color: colors.lightGray}} onPress={() => this.props.toggleCategory(false)}/>)
    }
    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <VbText uppercase style={[styles.category, {color: colors.lightGray}]} text={categoryCount}/>
        {reset}
      </View>
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
  search: {
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
    marginBottom: 10,
    marginTop: 15,
  },
  checkmark: {
    color: colors.brand,
    marginRight: 4.5,
  },
  category: {
    paddingBottom: 10,
    paddingTop: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },

});
