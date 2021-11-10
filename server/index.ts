import { firestore, realTimeDatabase } from "./database";
import * as express from "express";
import * as cors from "cors";
import { nanoid } from "nanoid";
import * as path from "path";

const PORT = process.env.PORT || 3000;

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
              userId: newUserRef.id,
            });
          });
      } else {
        res.status(400).json({
          message: "user already exist",
        });
      }
    });
});

app.post("/newroom", (req, res) => {
  const { userId } = req.body;
  const { userName } = req.body;
  usersCollection
    .doc(userId.toString())
    .get()
    .then((doc) => {
      if (doc.exists) {
        const rtdb = realTimeDatabase.ref("/rooms/" + nanoid());
        rtdb
          .set({
            jugador1: {
              userName,
              score: 0,
              ready: false,
              choice: "none",
            },
            jugador2: {
              userName: "rival",
              score: 0,
              ready: false,
              choice: "none",
            },
          })
          .then(() => {
            const roomLongId = rtdb.key;
            const roomId = Math.random()
              .toString(23)
              .substr(2, 6)
              .toUpperCase();
            roomsCollection
              .doc(roomId.toString())
              .set({
                rtdbRoomId: roomLongId,
                jugador1: userName,
                j1score: 0,
                jugador2: false,
                j2score: 0,
              })
              .then(() => {
                res.json({
                  rtdbRoomId: roomLongId,
                  roomId: roomId.toString(),
                  jugador: "jugador1",
                  rivalName: false,
                });
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
        roomsCollection
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

app.post("/rooms/:rtdbRoomId", (req, res) => {
  const { rtdbRoomId } = req.params;
  const { userName } = req.body;
  const { roomId } = req.body;
  roomsCollection
    .doc(roomId.toString())
    .get()
    .then((doc) => {
      const data = doc.data();
      if (data.jugador1 == userName) {
        const roomj1Ref = realTimeDatabase.ref(
          "/rooms/" + rtdbRoomId + "/jugador1"
        );
        roomj1Ref.update({
          userName,
        });
        roomsCollection.doc(roomId.toString()).update({
          jugador1: userName,
        });
        res.json({
          jugador: "jugador1",
        });
      } else {
        const roomj2Ref = realTimeDatabase.ref(
          "/rooms/" + rtdbRoomId + "/jugador2"
        );
        roomj2Ref.update({
          userName,
        });
        roomsCollection.doc(roomId.toString()).update({
          jugador2: userName,
        });
        res.json({
          jugador: "jugador2",
        });
      }
    });
});

app.get("/rooms/userinfo/:roomId/:jugador", (req, res) => {
  const { roomId } = req.params;
  const { jugador } = req.params;
  roomsCollection
    .doc(roomId.toString())
    .get()
    .then((doc) => {
      const data = doc.data();
      if (jugador == "jugador1") {
        res.json({
          rivalName: data.jugador2,
          score: data.j1score,
          rivalScore: data.j2score,
        });
      } else {
        res.json({
          rivalName: data.jugador1,
          score: data.j2score,
          rivalScore: data.j1score,
        });
      }
    });
});

app.post("/pushwinner", (req, res) => {
  const { rtdbRoomId } = req.body;
  const { jugador } = req.body;
  const { score } = req.body;
  const { rivalScore } = req.body;
  const { roomId } = req.body;
  const roomRef = realTimeDatabase.ref("/rooms/" + rtdbRoomId + "/" + jugador);
  roomRef.update({
    score: score,
  });
  res.json({
    message: "listo",
  });
  if (jugador == "jugador1") {
    roomsCollection
      .doc(roomId.toString())
      .update({
        j2score: rivalScore,
        j1score: score,
      })
      .then(() => {
        res.json({
          j1score: score,
        });
      });
  }
  if (jugador == "jugador2") {
    roomsCollection
      .doc(roomId.toString())
      .update({
        j1score: rivalScore,
        j2score: score,
      })
      .then(() => {
        res.json({
          j2score: score,
        });
      });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`\nServer listen on port: \x1b[32m${PORT}\x1b[0m`);
});
