const firebase = require("firebase");
require("firebase/firestore");

var instruments =[
    {
        "name":"Akordeon"
    },
    {
        "name":"Altówka"
    },
    {
        "name":"Bałałajka"
    },
    {
        "name":"Banjo"
    },
    {
        "name":"Bas"
    },
    {
        "name":"Bongosy"
    },
    {
        "name":"Cajon"
    },
    {
        "name":"Cymbały"
    },
    {
        "name":"Cytra"
    },
    {
        "name":"DAW"
    },
    {
        "name":"DJ"
    },
    {
        "name":"Dudy"
    },
    {
        "name":"Dulcimer"
    },
    {
        "name":"Fagot"
    },
    {
        "name":"Flet"
    },
    {
        "name":"Flet poprzeczny"
    },
    {
        "name":"Fletnia Pana"
    },
    {
        "name":"Fortepian"
    },
    {
        "name":"Gęśle"
    },
    {
        "name":"Gitara"
    },
    {
        "name":"Harfa"
    },
    {
        "name":"Harmonijka"
    },
    {
        "name":"Kastaniety"
    },
    {
        "name":"Kitara"
    },
    {
        "name":"Klarnet"
    },
    {
        "name":"Klawesyn"
    },
    {
        "name":"Klawisze"
    },
    {
        "name":"Komputer"
    },
    {
        "name":"Kontrabas"
    },
    {
        "name":"Kontrafagot"
    },
    {
        "name":"Kornet"
    },
    {
        "name":"Koto"
    },
    {
        "name":"Ksylofon"
    },
    {
        "name":"Lira"
    },
    {
        "name":"Lutnia"
    },
    {
        "name":"Mandolina"
    },
    {
        "name":"Marakasy"
    },
    {
        "name":"Marimba"
    },
    {
        "name":"Obój"
    },
    {
        "name":"Perkusja"
    },
    {
        "name":"Pianino"
    },
    {
        "name":"Puzon"
    },
    {
        "name":"Saksofon"
    },
    {
        "name":"Sampler"
    },
    {
        "name":"Sekwencer"
    },
    {
        "name":"Sitar"
    },
    {
        "name":"Skrzypce"
    },
    {
        "name":"Syntezator"
    },
    {
        "name":"Tamburyn"
    },
    {
        "name":"Trąbka"
    },
    {
        "name":"Trójkąt"
    },
    {
        "name":"Tuba"
    },
    {
        "name":"Ukulele"
    },
    {
        "name":"Waltornia"
    },
    {
        "name":"Wibrafon"
    },
    {
        "name":"Wiolonczela"
    },
    {
        "name":"Wokal"
    }
]

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

instruments.forEach(function(obj) {
    db.collection("instruments")
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