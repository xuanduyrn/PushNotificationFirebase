import *as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyDlVbWWg4UDFgG5FljzYlcodwHN3anGLqA",
    authDomain: "notifications-bb0db.firebaseapp.com",
    databaseURL: "https://notifications-bb0db.firebaseio.com",
    projectId: "notifications-bb0db",
    storageBucket: "notifications-bb0db.appspot.com",
    messagingSenderId: "641517805825"
  };
export const firebaseApp = firebase.initializeApp(config);
