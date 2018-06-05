import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Clipboard } from 'react-native';
import firebase from 'react-native-firebase';
import { StackNavigator } from "react-navigation";
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
//Component
import styles from './styles'
import Notifications from './Notifications'
import DetailNotifications from './DetailNotifications'

class HomeNotification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fcmToken: "",
      tokenCopyFeedback: ""
    }
  }

  setClipboardContent(text) {
    Clipboard.setString(text);
    this.setState({ tokenCopyFeedback: "Token copied to clipboard." });
    setTimeout(() => {
      this.clearTokenCopyFeedback();
    }, 2000);
  }
  clearTokenCopyFeedback() {
    this.setState({ tokenCopyFeedback: "" });
  }

  componentDidMount() {
    firebase.messaging().getToken()
      .then(fcmToken => {
        if (fcmToken) {
          this.setState({
            fcmToken: fcmToken || ""
          })
        }
      });
    //check permisstion
    firebase.messaging().hasPermission()
      .then(enabled => {
        if (enabled) {
          console.log('user has permissions messaging');
        } else {
          alert('Bạn đang không có quyền nhận Notification, Vui lòng kiểm tra settings hoặc Login để nhận');
        }
      });

    //lắng nghe notifi khi app đang mở
    this.notificationListener = firebase.notifications()
      .onNotification((notification) => {
        console.log('foreground');
        //nhan notification when app foreground
        //custom
        const dataNotifi = {
          id: notification.notificationId,
          title: notification.data.title,
          body: notification.data.body,
          messager: notification.data.messager,
          data: notification.data,
          content: notification.data.content,
          image: notification.data.image,
        };
        this.localShowNotification(dataNotifi);
      });

    //Khi click vao notifi ở trang thái app closed
    this.notificationAppCloseListener = firebase.notifications().getInitialNotification()
      .then((notificationOpen) => {
        if (notificationOpen) {
          // App was opened by a notification, when app Close
          const dataNotifi = {
            id: notificationOpen.notificationId,
            title: notificationOpen.data.title,
            body: notificationOpen.data.body,
            messager: notificationOpen.data.messager,
            data: notificationOpen.data,
            image: notificationOpen.data.image,
            content: notificationOpen.data.content,
          };
          this.handleCustomData(dataNotifi);
        }
      });

    //Khi click vao notifi ở trang thái background and foreground trên local
    this.notificationWhenClick = firebase.notifications().onNotificationOpened(
      (notificationOpen) => {
        console.log('background');
        //khi nhan vao 1 notification tao boi local notification
        const dataNotifi = {
          id: notificationOpen.notification.notificationId,
          title: notificationOpen.notification.data.title,
          body: notificationOpen.notification.data.body,
          messager: notificationOpen.notification.data.messager,
          data: notificationOpen.notification.data,
          image: notificationOpen.notification.data.image,
          content: notificationOpen.notification.content,
        };
        this.handleCustomData(dataNotifi);
      });
  }

  componentWillUnmount() {
    this.notificationListener();
    this.notificationAppCloseListener();
    this.notificationWhenClick();
  }

  handleCustomData(dataNotifi) {
    //handle
    if (dataNotifi.title !== undefined && dataNotifi.body !== undefined) {
      this.props.navigation.navigate('DetailNotifications', { dataNotifi: dataNotifi });
    }
  }

  localShowNotification(notifi) {
    if (notifi.body && notifi.title && notifi.id) {
      const notification = new firebase.notifications.Notification()
        .setNotificationId(notifi.id)
        .setTitle(notifi.title)
        .setBody(notifi.body)
        .setSound('default')
        .android.setChannelId('default_notification_channel_id')
        .android.setSmallIcon('ic_launcher')
        .android.setAutoCancel(true)
        .setData({
          //muốn lấy cái gì thì get dữ liệu tại đây
          title: notifi.title,
          body: notifi.body,
          messager: notifi.messager,
          id: notifi.id,
          custom_data: notifi.data,
          image: notifi.image,
          content: notifi.content
        });
      // Build a channel
      const channel = new firebase.notifications.Android.Channel('default_notification_channel_id', 'default_notification_channel_id',
        firebase.notifications.Android.Importance.Max)
        .setDescription('Example');
      // Create the channel
      firebase.notifications().android.createChannel(channel);
      // Display the notification
      firebase.notifications().displayNotification(notification);
    }
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.Header}>
          <TouchableOpacity style={styles.btnMenu} onPress={() => this.props.navigation.navigate('PushNotifiCations')}>
            <Ionicons name="md-menu" size={20} color='#fff' />
          </TouchableOpacity>
          <View style={styles.viewHeader}>
            <Text style={styles.welcome}>Push Notification</Text>
          </View>
          <TouchableOpacity style={styles.btnNotifi} onPress={() => this.props.navigation.navigate('Notifications')}>
            <Ionicons name="ios-notifications" size={20} color='#fff' />
          </TouchableOpacity>
        </View>
        <ScrollView style={{ paddingHorizontal: 20 }}>
          <Text style={styles.feedback}>{this.state.tokenCopyFeedback}</Text>
          <Text style={styles.feedback} selectable={true}
            onPress={() => this.setClipboardContent(this.state.fcmToken)}>
            {this.state.fcmToken}
          </Text>
        </ScrollView>
      </View>
    );
  }
}

export default StackNavigator(
  {
    Main: {
      screen: HomeNotification,
      navigationOptions: {
        header: null
      }
    },
    DetailNotifications: {
      screen: DetailNotifications,
      navigationOptions: {
        header: null
      }
    },
    Notifications: {
      screen: Notifications,
      navigationOptions: {
        header: null
      }
    },
  },
  {
    initialRouteName: "Main"
  }
);
