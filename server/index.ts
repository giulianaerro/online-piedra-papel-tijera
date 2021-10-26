import { firestore, realTimeDatabase } from "./database";
import * as express from "express";
import * as cors from "cors";
import { nanoid } from "nanoid";

const port = 3000;

const app = express();
app.use(express.json());
app.use(express.static("dist"));
app.use(cors());

const roomsCollection = firestore.collection("rooms");
const usersCollection = firestore.collection("users");

app.post("/signup", (req, res) => {
  const { userName } = req.body;
  usersCollection
    .where("userName", "==", userName)
    .get()
    .then((searchResponse) => {
      if (searchResponse.empty) {
        usersCollection
          .add({
            userName,
          })
          .then((newUserRef) => {
            res.json({
              id: newUserRef.id,
            });
          });
      } else {
        res.status(400).json({
          message: "user already exist",
        });
      }
    });
});

app.post("/rooms", (req, res) => {
  const { userId } = req.body;
  usersCollection
    .doc(userId.toString())
    .get()
    .then((doc) => {
      if (doc.exists) {
        const rtdb = realTimeDatabase.ref("/rooms/" + nanoid());
        rtdb
          .set({
            message: [],
            owner: userId,
          })
          .then(() => {
            const roomLongId = rtdb.key;
            const roomId = Math.random()
              .toString(23)
              .substr(2, 6)
              .toUpperCase();
            usersCollection
              .doc(roomId.toString())
              .set({
                rtdbRoomId: roomLongId,
              })
              .then(() => {
                res.json({ id: roomId.toString() });
              });
          });
      } else {
        res.status(404).json({
          message: "no existis",
        });
      }
    });
});
app.get("/rooms/:roomId", (req, res) => {
  const { userId } = req.query;
  const { roomId } = req.params;
  usersCollection
    .doc(userId.toString())
    .get()
    .then((doc) => {
      if (doc.exists) {
        usersCollection
          .doc(roomId)
          .get()
          .then((snap) => {
            console.log(snap);
            const data = snap.data();
            res.json(data);
          });
      } else {
        res.status(404).json({
          message: "no existis",
        });
      }
    });
});

app.listen(port, () => {
  console.log(`\nServer listen on port: \x1b[32m${port}\x1b[0m`);
});
