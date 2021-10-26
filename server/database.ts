import * as firebaseAdmin from "firebase-admin";
const key = require("./key.json");

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(key as any),
  databaseURL: "https://piedra-papel-tijera-acbd3-default-rtdb.firebaseio.com",
});

const firestore = firebaseAdmin.firestore();
const realTimeDatabase = firebaseAdmin.database();

export { firestore, realTimeDatabase };
