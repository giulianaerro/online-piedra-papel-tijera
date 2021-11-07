import { Router } from "@vaadin/router";
import { realTimeDatabase } from "./database";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3000";

const state = {
  data: {
    userName: "",
    userId: "",
    roomId: "",
    rtdbRoomId: "",
    rivalName: "",
    jugador: "",
    score: "",
    rivalScore: "",
    choice: "",
    rivalChoice: "",
  },

  listeners: [],
  init() {
    const localState = localStorage.getItem("save-state");
    if (localState) {
      state.setState(JSON.parse(localState));
    }
  },

  getState() {
    return this.data;
  },

  signUp(userName: string) {
    const currentState = this.getState();
    currentState.userName = userName;
    if (userName) {
      return fetch(API_BASE_URL + "/signup", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          userName: currentState.userName,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.userId);
          currentState.userId = data.userId;
          this.setState(currentState);
        });
    } else {
      console.log("error");
    }
  },

  newRoom(callback?) {
    const currentState = this.getState();
    return fetch(API_BASE_URL + "/newroom", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userId: currentState.userId,
        userName: currentState.userName,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        currentState.roomId = data.roomId;
        currentState.rtdbRoomId = data.rtdbRoomId;
        currentState.jugador = data.jugador;
        currentState.rivalName = data.rivalName;
        this.setState(currentState);

        callback();
      });
  },
  getRealTimeDatabase(roomId: string) {
    const currentState = this.getState();
    return fetch(
      API_BASE_URL + "/rooms/" + roomId + "?userId=" + currentState.userId
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        currentState.rtdbRoomId = data.rtdbRoomId;
        this.setState(currentState);
      });
  },
  connectToRoom(callback?) {
    const currentState = this.getState();
    return fetch(API_BASE_URL + `/rooms/${currentState.rtdbRoomId}`, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userName: currentState.userName,
        roomId: currentState.roomId,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        currentState.jugador = data.jugador;
        this.setState(currentState);
        callback();
      });
  },

  getRivalInfo(callback?) {
    const currentState = this.getState();
    return fetch(
      API_BASE_URL +
        `/rooms/userinfo/${currentState.roomId}/${currentState.jugador}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        currentState.rivalName = data.rivalName;
        currentState.score = data.score;
        currentState.rivalScore = data.rivalScore;
        this.setState(currentState);
        callback();
      });
  },
  setReadyTrue() {
    const currentState = this.getState();
    const roomRef = realTimeDatabase.ref(
      "/rooms/" + currentState.rtdbRoomId + "/" + currentState.jugador
    );
    roomRef.update({
      ready: true,
    });
  },

  listenReady() {
    const currentState = this.getState();
    const roomRef = realTimeDatabase.ref("/rooms/" + currentState.rtdbRoomId);

    roomRef.on("value", (snap) => {
      const j1ReadyTrue = snap.val().jugador1.ready;
      const j2ReadyTrue = snap.val().jugador2.ready;
      if (j1ReadyTrue == true && j2ReadyTrue == true) {
        Router.go("/play");
      }
    });
  },
  setPlayerPlay(choice) {
    const currentState = this.getState();
    currentState.choice = choice;
    this.setState(currentState);

    const roomRef = realTimeDatabase.ref(
      "/rooms/" + currentState.rtdbRoomId + "/" + currentState.jugador
    );
    roomRef.update({
      choice,
    });
  },
  setRivalPlay() {
    const currentState = this.getState();
    const roomsRef = realTimeDatabase.ref("/rooms/" + currentState.rtdbRoomId);
    roomsRef.on("value", (snap) => {
      if (currentState.jugador == "jugador1") {
        var rivalChoice = snap.val().jugador2.choice;
        currentState.rivalChoice = rivalChoice;
        this.setState(currentState);
      }
      if (currentState.jugador == "jugador2") {
        var rivalChoice = snap.val().jugador1.choice;
        currentState.rivalChoice = rivalChoice;
        this.setState(currentState);
      }
    });
  },
  whoWins() {
    const currentState = this.getState();
    const ganaPiedra =
      currentState.choice == "piedra" && currentState.rivalChoice == "tijera";
    const ganaPapel =
      currentState.choice == "papel" && currentState.rivalChoice == "piedra";
    const ganaTijera =
      currentState.choice == "tijera" && currentState.rivalChoice == "papel";

    const ganaste = [ganaPiedra, ganaPapel, ganaTijera].includes(true);

    if (ganaste == true) {
      currentState.score++;
      return "ganaste";
    } else if (currentState.choice == currentState.rivalChoice) {
      return "empataste";
    } else {
      currentState.rivalScore++;
      return "perdiste";
    }
  },
  pushWinner() {
    const currentState = this.getState();
    fetch(API_BASE_URL + "/pushwinner", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        rtdbRoomId: currentState.rtdbRoomId,
        jugador: currentState.jugador,
        score: currentState.score,
        rivalScore: currentState.rivalScore,
        roomId: currentState.roomId,
      }),
    });
  },
  setReadyFalse() {
    const currentState = this.getState();
    const roomRef = realTimeDatabase.ref(
      "/rooms/" + currentState.rtdbRoomId + "/" + currentState.jugador
    );
    roomRef.update({
      ready: false,
    });
  },

  setState(newState) {
    this.data = newState;
    for (const cb of this.listeners) {
      cb();
    }
    localStorage.setItem("save-state", JSON.stringify(newState));

    console.log("soy el state, he cambiado", this.data);
  },

  subscribe(callback: (any) => any) {
    this.listeners.push(callback);
  },
};
export { state };
