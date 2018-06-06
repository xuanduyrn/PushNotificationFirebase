/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  FlatList
} from 'react-native';
import firebase from 'react-native-firebase';
import DataCard from './Data';

export default class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token:'',
    }
  }

  componentDidMount() {
    firebase.messaging().getToken()
      .then(token => {
        if (token) {
          this.setState({
            token: token || ""
          })
        }
      });

    return fetch('http://192.168.1.8:3000/fcm/ShowAllNotifi.php')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          data: responseJson
        })
      })
      .catch((error) => {
        console.error(error);
    });
  }

  insertTokenUser = () => {
    fetch('http://192.168.1.8:3000/fcm/fcm_insert.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: this.state.token
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        Alert.alert(responseJson);
      }).catch((error) => {
        console.error(error);
      });
  }

  _renderItem = ({item, index}) => (
    <DataCard
      item={item}
      key={item._id}
    />
  );
  _keyExtractor = (item, index) => index.toString();

  render() {
    console.log(this.state.data);
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Token"
          value={this.state.token}
          underlineColorAndroid='transparent'
          style={{width: '80%', height: 40, backgroundColor: 'grey'}}
        />
        <TouchableOpacity style={{justifyContent: 'center',alignItems: 'center'}} onPress={this.insertTokenUser}>
          <Text>POST TOKEN</Text>
        </TouchableOpacity>
        <FlatList
          data={this.state.data}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
