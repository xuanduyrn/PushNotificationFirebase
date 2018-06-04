/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet
} from 'react-native';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
const { width, height } = Dimensions.get('window');

export default class DetailNotifications extends Component {
  render() {
    console.log(this.props.navigation.state.params.dataNotifi);
    return (
      <View style={styles.container}>
        {
          //Header
          <View style={styles.viewHeader}>
            <TouchableOpacity style={styles.btnBack} onPress={()=> this.props.navigation.goBack('')}>
              <Ionicons name="md-arrow-back" size={20} color='#fff' />
            </TouchableOpacity>
            <Text style={styles.txtHeader}>{this.props.navigation.state.params.dataNotifi.data.title}</Text>
          </View>
        }
        {
          <View style={styles.viewBody}>
            <Text style={styles.txtBody}>{this.props.navigation.state.params.dataNotifi.data.messager}</Text>
            <Text style={styles.txtBody}>{this.props.navigation.state.params.dataNotifi.data.content}</Text>
            <Text style={styles.txtBody}>{this.props.navigation.state.params.dataNotifi.data.body}</Text>
          </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  viewHeader: {
    width: width,
    height: 55,
    backgroundColor: '#008080',
    alignItems: 'center',
    flexDirection: 'row'
  },
  txtHeader: {
    fontSize: 16,
    color: '#fff',
  },
  btnBack: {
    height: 55,
    width: 55,
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewBody: {
    flexDirection: 'column',
    marginTop: 20
  },
  txtBody: {
    fontSize: 16,
    color: 'green',
    marginLeft: 10,
    marginRight: 10
  }
})
