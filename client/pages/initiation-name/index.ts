import { Router } from "@vaadin/router";
import { state } from "../../state";

class InitiationName extends HTMLElement {
  connectedCallback() {
    this.render();
    const form = document.querySelector(".form__user-name");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const target = e.target as any;
      const user = target.name.value;
      const currentState = state.getState();

      if (currentState.roomId) {
        state.signUp(user).then(() => {
          state.getRealTimeDatabase(currentState.roomId).then(() => {
            state.connectToRoom(() => {
              Router.go("/instruction");
              state.setOnlineTrue();
            });
          });
        });
      } else {
        state.signUp(user).then(() => {
          state.newRoom(() => {
            Router.go("/sharecode");
            state.setOnlineTrue();
          });
        });
      }
    });
  }

  render() {
    const style = document.createElement("style");

    style.innerHTML = `
        .input{
            margin-top: 30px;
            margin-bottom: 10px;
            color:black;
            border: 8px solid black;
            border-radius: 8px;
            width: 100%;
            max-width: 404px;
            padding: 9px;
            font-size: 35px;
            font-family: "Roboto", sans-serif;
            
          }
          input::placeholder{
            text-align: center;
            font-size:25px;
          }
          .button{
            background-color: #006CFC;
            border: 8px solid #001997;
            border-radius: 8px;
            width: 100%;
            max-width: 404px;
            padding-top: 9px;
            padding-bottom: 9px;
            font-family: "Odibee Sans", cursive;
            color: #fff;
            font-size: 35px;
            cursor: pointer;
            font-family: "Roboto", sans-serif;
          }
          `;
    this.innerHTML = `
      <div class="welcome__container">
        <div class="welcome__container-title">
          <my-text variant="title">Piedra, Papel, ó Tijera</my-text>
        </div>
        
        <form class="form__user-name">
          <input class="input" type="text" name="name" placeholder="TU NOMBRE">
          <button class="button">Empezar</button>
        </form>
    
        <div class="welcome__container-hands">
          <my-hands material="piedra"></my-hands>
          <my-hands material="papel"></my-hands>
          <my-hands material="tijera"></my-hands>
        </div>
      </div>`;
    this.appendChild(style);
  }
}
customElements.define("initiationname-page", InitiationName);
