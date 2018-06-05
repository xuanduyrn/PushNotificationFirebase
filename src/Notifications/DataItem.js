/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from 'react-native';
const { width, height } = Dimensions.get('window');
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import Entypo from 'react-native-vector-icons/dist/Entypo';

export default class DataItem extends Component {
  render() {
    const { dataNotifi } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.btnItem} onPress={()=> this.props.navigation.navigate('DetailNotifications',{dataNotifi: dataNotifi})}>
          <View style={styles.iconMess}>
            <MaterialIcons name="message" size={20} />
          </View>
          <View style={styles.viewNotifi}>
            <Text style={styles.txtTyofnews}>{dataNotifi.data.title}</Text>
            <Text numberOfLines={1} style={styles.txtBody}>{dataNotifi.data.body}</Text>
          </View>
          <View style={styles.viewIconLeft}>
            <Entypo name="chevron-thin-right" size={15} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10
  },
  btnItem: {
    width: width,
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  iconMess: {
    width: 55,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewNotifi: {
    flexDirection: 'column',
    position: 'absolute',
    left: 60,
    width: '75%'
  },
  viewIconLeft: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 55,
    height: 55,
    marginRight: 10
  },
  txtTyofnews: {
    fontSize: 16,
    color: '#000'
  },
  txtBody: {
    fontSize: 14,
    marginRight: 20
  },
});
