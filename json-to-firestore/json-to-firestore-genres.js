//node file-name.js <- to run

const firebase = require("firebase");
require("firebase/firestore");

var genres = [
    {
        "name":"Acoustic"
    },
    {
        "name":"Alternative"
    },
    {
        "name":"Ambient"
    },
    {
        "name":"Biesiadna"
    },
    {
        "name":"Bluegrass"
    },
    {
        "name":"Blues"
    },
    {
        "name":"Celtic"
    },
    {
        "name":"Chill Out"
    },
    {
        "name":"Classic"
    },
    {
        "name":"Country"
    },
    {
        "name":"Covers"
    },
    {
        "name":"Dance"
    },
    {
        "name":"Disco Polo"
    },
    {
        "name":"Djent"
    },
    {
        "name":"Drum &amp; Bass"
    },
    {
        "name":"Dubstep"
    },
    {
        "name":"Electro"
    },
    {
        "name":"Elektroniczna"
    },
    {
        "name":"Flamenco"
    },
    {
        "name":"Folk"
    },
    {
        "name":"Folk Metal"
    },
    {
        "name":"Funk"
    },
    {
        "name":"Gothic"
    },
    {
        "name":"Grunge"
    },
    {
        "name":"Hard Rock"
    },
    {
        "name":"Hardcore"
    },
    {
        "name":"Hip Hop"
    },
    {
        "name":"House"
    },
    {
        "name":"Indie"
    },
    {
        "name":"Industrial"
    },
    {
        "name":"Jazz"
    },
    {
        "name":"Ludowa"
    },
    {
        "name":"Metal"
    },
    {
        "name":"Neofolk"
    },
    {
        "name":"New Age"
    },
    {
        "name":"New wave"
    },
    {
        "name":"Noise"
    },
    {
        "name":"Opera"
    },
    {
        "name":"Piosenka poetycka"
    },
    {
        "name":"Poezja śpiewana"
    },
    {
        "name":"Pop"
    },
    {
        "name":"Post Rock"
    },
    {
        "name":"Punk"
    },
    {
        "name":"Rap"
    },
    {
        "name":"Reggae"
    },
    {
        "name":"Religion"
    },
    {
        "name":"Rock"
    },
    {
        "name":"Rock &amp; Roll"
    },
    {
        "name":"Rock Progresywny"
    },
    {
        "name":"Ska"
    },
    {
        "name":"Soul"
    },
    {
        "name":"Symphonic"
    },
    {
        "name":"Synthpop"
    },
    {
        "name":"Szanty"
    },
    {
        "name":"Techno"
    },
    {
        "name":"Tradycyjna"
    },
    {
        "name":"Weselna"
    },
    {
        "name": "Trance"
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

genres.forEach(function(obj) {
    db.collection("genres")
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