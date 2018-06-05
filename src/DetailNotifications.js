/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image,
  Alert
} from 'react-native';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
const { width, height } = Dimensions.get('window');

export default class DetailNotifications extends Component {
  ShowNotifi(){
    Alert.alert(
      'Thông Báo',
      'Bạn đã xác nhận vận chuyển đơn hàng',
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      { cancelable: false }
    )
  }
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
            <Text style={styles.txtMessager}>{this.props.navigation.state.params.dataNotifi.data.messager}</Text>
            <Image
              style={styles.imgrender}
              source={{uri: this.props.navigation.state.params.dataNotifi.data.image}}
            />
            <Text style={styles.txtContent}>{this.props.navigation.state.params.dataNotifi.data.content}</Text>
            <Text style={styles.txtBody}>{this.props.navigation.state.params.dataNotifi.data.body}</Text>
          </View>
        }
        {
          this.props.navigation.state.params.dataNotifi.data.image ?
          <View style={styles.viewBtnConfirm}>
            <TouchableOpacity style={styles.BtnConfirm} onPress={()=> this.ShowNotifi()}>
                <Text style={styles.txtConfirm}>Confirm</Text>
            </TouchableOpacity>
          </View>
           :
          null
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  txtMessager: {
    fontSize: 17,
    padding: 10
  },
  txtContent: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1BB054',
    padding: 10
  },
  txtBody: {
    fontSize: 15,
    padding: 10
  },
  viewBtnConfirm: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  BtnConfirm: {
    width: '96%',
    height: 50,
    backgroundColor: '#008080',
    position: 'absolute',
    left: '2%',
    right: '2%',
    bottom: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtConfirm: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center'
  },
  imgrender: {
    width: '95%',
    height: 200,
    marginLeft: '2.5%'
  },
})
