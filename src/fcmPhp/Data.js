/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

export default class MyComponent extends Component {
  render() {
    const { item } = this.props;
    return (
      <TouchableOpacity style={{width: 200, height: 40, flexDirection: 'column', backgroundColor: 'green', justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{}}>{item.title}</Text>
        <Text style={{}}>{item.message}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
