import React, {
    Component
} from 'react';
import { View, Text } from 'react-native'
import firebase from 'react-native-firebase';

export default class Notification extends Component {
    componentDidMount() {
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
            //nhan notification when app foreground
            const dataNotifi = {
                id: notification.notificationId,
                title: notification.title,
                body: notification.body,
                data: notification.data.custom_data,
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
                        title: notificationOpen.title,
                        body: notificationOpen.body,
                        data: notificationOpen.data,
                    };
                    this.handleCustomData(dataNotifi);
                }
            });

        //Khi click vao notifi ở trang thái background and foreground trên local
        this.notificationWhenClick = firebase.notifications().onNotificationOpened(
            (notificationOpen) => {
                //khi nhan vao 1 notification tao boi local notification
                const dataNotifi = {
                    id: notificationOpen.notification.notificationId,
                    title: notificationOpen.notification.title,
                    body: notificationOpen.notification.body,
                    data: notificationOpen.notification.data,
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
            this.props.navigate('NotificationDetails', dataNotifi);
        }
    }

    localShowNotification(notifi) {
        if (notifi.body && notifi.title) {
            const notification = new firebase.notifications.Notification()
                .setNotificationId('notificationId')
                .setTitle(notifi.title)
                .setBody(notifi.body)
                // .setSound('notification')
                .android.setChannelId('default_notification_channel_id')
                .android.setSmallIcon('ic_launcher')
                .setData({
                    //muốn lấy cái gì thì get dữ liệu tại đây
                    title: notifi.title,
                    body: notifi.body,
                    custom_data: notifi.data
                });
            // Build a channel
        const channel = new firebase.notifications.Android.Channel('default_notification_channel_id', 'default_notification_channel_id',
        firebase.notifications.Android.Importance.Max)
        .setDescription('Vận tài hòa phát');
        // Create the channel
        firebase.notifications().android.createChannel(channel);
        // Display the notification
        firebase.notifications().displayNotification(notification);
        }
    }
    render() {
        return (
          <View style={{}}>
            <Text style={{}}>abc</Text>
          </View>
        );
    }
}
