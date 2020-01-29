import firebase from "firebase";
require("dotenv").config();

const firebaseConfig = {
  apiKey: "AIzaSyDD09oPCxKMyYAMoUFcrJaXI-rZEaqw77o",
  authDomain: "octo-waffle-b2ea8.firebaseapp.com",
  databaseURL: "https://octo-waffle-b2ea8.firebaseio.com",
  projectId: "octo-waffle-b2ea8",
  storageBucket: "octo-waffle-b2ea8.appspot.com",
  messagingSenderId: "91680883559",
  appId: "1:91680883559:web:910b566aba122ecf7fa5c2"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
