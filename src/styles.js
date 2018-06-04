import React,{Component} from 'react';
import {
  StyleSheet,
  Dimensions
} from 'react-native';
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  //Header
  Header: {
    width: '100%',
    height: 55,
    backgroundColor: '#008080',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  btnMenu: {
    width: 55,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnNotifi: {
    width: 55,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  //welcome
  welcome: {
    fontSize: 17,
    textAlign: "center",
    color: '#fff'
  },
  viewHeader: {
    width: width - 110
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 2
  },
  feedback: {
    textAlign: "center",
    color: "#996633",
    marginBottom: 3
  },
  button: {
    backgroundColor: "teal",
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginVertical: 10,
    borderRadius: 10
  },
  buttonText: {
    color: "white",
    backgroundColor: "transparent"
  },
})
export default styles;
