"use strict";
exports.__esModule = true;
exports.realTimeDatabase = exports.firestore = void 0;
var firebaseAdmin = require("firebase-admin");
var key = require("./key.json");
firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(key),
    databaseURL: "https://database-modulo6-default-rtdb.firebaseio.com"
});
var firestore = firebaseAdmin.firestore();
exports.firestore = firestore;
var realTimeDatabase = firebaseAdmin.database();
exports.realTimeDatabase = realTimeDatabase;
