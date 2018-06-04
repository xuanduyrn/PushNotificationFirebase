import React,{Component} from 'react';
import {
  StyleSheet,
  Dimensions
} from 'react-native';
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Header: {
    height: 55,
    width: width,
    backgroundColor: '#008080',
    alignItems: 'center',
    flexDirection: 'row',
  },
  btnBack: {
    height: 55,
    width: 55,
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtNotifi: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 10
  }
})
export default styles;
