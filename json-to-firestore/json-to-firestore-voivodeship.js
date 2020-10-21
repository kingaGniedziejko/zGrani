const firebase = require("firebase");
require("firebase/firestore");

var voivodeship = [
    {
        "name":"Dolnośląskie"
    },
    {
        "name":"Kujawsko-pomorskie"
    },
    {
        "name":"Lubelskie"
    },
    {
        "name":"Lubuskie"
    },
    {
        "name":"Łódzkie"
    },
    {
        "name":"Małopolskie"
    },
    {
        "name":"Mazowieckie"
    },
    {
        "name":"Opolskie"
    },
    {
        "name":"Podkarpackie"
    },
    {
        "name":"Podlaskie"
    },
    {
        "name":"Pomorskie"
    },
    {
        "name":"Śląskie"
    },
    {
        "name":"Świętokrzyskie"
    },
    {
        "name":"Warmińsko-mazurskie"
    },
    {
        "name":"Wielkopolskie"
    },
    {
        "name":"Zachodniopomorskie"
    }];

var firebaseConfig = {
    apiKey: "AIzaSyC-FZFdogk9TaNPwItz-fhB_eeF4GiPubg",
    authDomain: "zgrani.firebaseapp.com",
    databaseURL: "https://zgrani.firebaseio.com",
    projectId: "zgrani",
    storageBucket: "zgrani.appspot.com",
    messagingSenderId: "88163256699",
    appId: "1:88163256699:web:81394eea52ee6a6e6515de",
    measurementId: "G-H9R69W1X9X"
};

var fire = firebase.initializeApp(firebaseConfig);

var db = fire.firestore();

// voivodeship.forEach(function(obj) {
//     db.collection("voivodeships2").doc(obj.name)
//         .then(function(docRef) {
//             console.log("Document written with ID: ", docRef.id);
//         })
//         .catch(function(error) {
//             console.error("Error adding document: ", error);
//         });
// });

voivodeship.forEach(function(obj) {
    db.collection("voivodeships")
        .add({
            name: obj.name
        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
});