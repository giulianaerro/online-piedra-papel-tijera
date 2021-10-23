import * as firebaseAdmin from "firebase-admin";
const key = require("./key.json");

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(key as any),
  databaseURL: "https://database-modulo6-default-rtdb.firebaseio.com",
});

const firestore = firebaseAdmin.firestore();
const realTimeDatabase = firebaseAdmin.database();

export { firestore, realTimeDatabase };
