const firebase = require('firebase/app');

const firebaseConfig = {
  apiKey: "AIzaSyBf0rZnv7Q1yYkXL62QvAw7V0T6NAZrfUc",
  authDomain: "god-of-dice.firebaseapp.com",
  databaseURL: "https://god-of-dice.firebaseio.com",
  projectId: "god-of-dice",
  storageBucket: "god-of-dice.appspot.com",
  messagingSenderId: "975764585622",
  appId: "1:975764585622:web:08365b47a7d3916b0ed6b7"
};

firebase.initializeApp(firebaseConfig);

module.exports = firebase;
