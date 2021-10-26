import firebase from "firebase";

const app = firebase.initializeApp({
  apiKey: "v0c9SFpxZzCWAUwBEu4S0ItBJU6YMBn12rbNggTD",
  authDomain: "piedra-papel-tijera-acbd3.firebaseapp.com",
  databaseURL: "https://piedra-papel-tijera-acbd3-default-rtdb.firebaseio.com",
});

export const realTimeDatabase = firebase.database();
