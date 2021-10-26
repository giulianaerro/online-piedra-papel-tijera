const API_BASE_URL = "http://localhost:3000";

const state = {
  data: {
    userName: "",
    userId: "",
    roomId: "",
    rtdbRoomId: "",
  },

  listeners: [],

  init() {},
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
        body: JSON.stringify({ userName: userName }),
      })
        .then((res) => res.json())
        .then((data) => {
          currentState.userId = data.id.toString();
          this.setState(currentState);
        })
        .catch(() => {
          alert("Este usuario ya existe");
        });
    } else {
      console.error("Ingresa un usuario");
    }
  },
  newRoom(callback?) {
    const currentState = this.getState();
    if (currentState.userId) {
      return fetch(API_BASE_URL + "/rooms", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ userId: currentState.userId }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          currentState.roomId = data.id;
          this.setState(currentState);
          if (callback) {
            callback();
          }
        });
    } else {
      console.error("no hay user idddd");
    }
  },
  accessToRoom(callback?) {
    const currentState = this.getState();
    const roomId = currentState.roomId;
    if (currentState.userId) {
      return fetch(
        API_BASE_URL + "/rooms/" + roomId + "?userId=" + currentState.userId
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          currentState.rtdbRoomId = data.rtdbRoomId;
          this.setState(currentState);
          // this.listenRoom();
          if (callback) {
            callback();
          }
        });
    } else {
      console.error("no hay user id");
    }
  },

  setState(newState) {
    this.data = newState;
    for (const cb of this.listeners) {
      cb();
    }
    console.log("soy el state, he cambiado", this.data);
  },
  subscribe(callback: (any) => any) {
    this.listeners.push(callback);
  },
};
export { state };
