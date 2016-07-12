/* @flow */

import React, { Component } from 'react';
import {
  ListView,
  Text,
  StyleSheet,
} from 'react-native';

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
      console.log('catsss', this.props);
      this.setState({
        ...this.state,
        categories: props.categories,
        dataSource: this.state.dataSource.cloneWithRows(props.categories),
      });
    }
  }
  render() {
    console.log(this.state.categories);
    if(!this.state.categories.length){
      return <Text>LOADING</Text>
    }
    return (
      <ListView
        style={[this.props.style, styles.container]}
        automaticallyAdjustContentInsets={true}
        dataSource={this.state.dataSource}
        renderRow={this.renderCategoryCell.bind(this)}
        enableEmptySections={true}
      />
    );
  }
  renderCategoryCell(category){
    console.log('category', category);
    return (
      <Text>{category}</Text>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
