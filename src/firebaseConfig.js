import firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'

var config = {
    apiKey: "AIzaSyC-FZFdogk9TaNPwItz-fhB_eeF4GiPubg",
    authDomain: "zgrani.firebaseapp.com",
    databaseURL: "https://zgrani.firebaseio.com",
    projectId: "zgrani",
    storageBucket: "zgrani.appspot.com",
    messagingSenderId: "88163256699",
    appId: "1:88163256699:web:81394eea52ee6a6e6515de",
    measurementId: "G-H9R69W1X9X"
};

firebase.initializeApp(config);

//deleted in future release
// firebase.firestore().settings({timestampsInSnapshots: true})

export default firebase;