import { Router } from "@vaadin/router";
import { state } from "../../state";

class ErrorRival extends HTMLElement {
  rivalName: string;
  connectedCallback() {
    const currentState = state.getState();
    this.rivalName = currentState.rivalName;
    this.render();

    const error = document.querySelector(".button");
    error.addEventListener("click", () => {
      Router.go("./instruction");
    });
  }
  render() {
    const style = document.createElement("style");

    style.innerHTML = `

      
      `;
    this.innerHTML = `
    <div class="initiation__container new-initiation">
    <my-text variant="title">¡Error!</my-text>
    <div class="initiation__container-text">
        <my-text variant="instrucciones">${this.rivalName} no eligió ninguna opción!</my-text>
    </div>

        <my-button variant="blue" class="button">Volver a intentar</my-button>

    <div class="welcome__container-hands">
        <my-hands material="piedra"></my-hands>
        <my-hands material="papel"></my-hands>
        <my-hands material="tijera"></my-hands>
    </div>
  </div>
    `;
    this.appendChild(style);
  }
}
customElements.define("error-rivalnojuega", ErrorRival);
