/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList
} from 'react-native';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
//DataItem
import DataItem from './DataItem';
import Data from './Data';
//styles
import styles from './styles';

export default class Notifications extends Component {
  _renderItem = ({item, index}) => (
    <DataItem
      dataNotifi={item}
      key={item.id}
      navigation={this.props.navigation}
    />
  );
  _keyExtractor = (item, index) => index.toString();
  render() {
    return (
      <View style={styles.container}>
        {
          //Header
          <View style={styles.Header}>
            <TouchableOpacity style={styles.btnBack} onPress={()=> this.props.navigation.goBack('')}>
              <Ionicons name="md-arrow-back" size={20} color='#fff' />
            </TouchableOpacity>
            <Text style={styles.txtNotifi}>Notifications</Text>
          </View>
        }
        {
          <FlatList
            data={Data}
            extraData={this.state}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
          />
        }
      </View>
    );
  }
}
