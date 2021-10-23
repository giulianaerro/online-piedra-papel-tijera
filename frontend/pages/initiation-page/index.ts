import { Router } from "@vaadin/router";

class InitiationPage extends HTMLElement {
  connectedCallback() {
    this.render();

    const buttonNewGame = document.querySelector(".button-new");
    buttonNewGame.addEventListener("click", () => {
      Router.go("./roomuser");
    });

    const buttonEnterRoom = document.querySelector(".button-enter");
    buttonEnterRoom.addEventListener("click", () => {
      Router.go("./roomid");
    });
  }
  render() {
    this.innerHTML = `
  <div class="welcome__container">
  <div class="welcome__container-title">
      <my-text variant="title">Piedra, Papel, ó Tijera</my-text>
  </div>
  <div class="welcome__container-button">
      <my-button variant="blue" class="button button-new">Nuevo Juego</my-button>
      <my-button variant="blue" class="button button-enter">Ingresar a una sala</my-button>
      </div>
  <div class="welcome__container-hands">
      <my-hands material="piedra"></my-hands>
      <my-hands material="papel"></my-hands>
      <my-hands material="tijera"></my-hands>
  </div>
</div>
  `;
  }
}
customElements.define("initiation-page", InitiationPage);
