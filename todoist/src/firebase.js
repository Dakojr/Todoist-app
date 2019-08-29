import firebase from 'firebase/app';
import 'firebase'

const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyBoksEwKThbrezSmSE4EKIoJHeOO8N-J44",
    authDomain: "todoist-dakojr.firebaseapp.com",
    databaseURL: "https://todoist-dakojr.firebaseio.com",
    projectId: "todoist-dakojr",
    storageBucket: "todoist-dakojr.appspot.com",
    messagingSenderId: "772756268635",
    appId: "1:772756268635:web:ee7dba71a89ffb15"
})

export {firebaseConfig as firebase };