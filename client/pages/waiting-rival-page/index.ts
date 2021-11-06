import { Router } from "@vaadin/router";
import { state } from "../../state";

class WaitingPage extends HTMLElement {
  rivalName: string;
  connectedCallback() {
    const currentState = state.getState();
    this.rivalName = currentState.rivalName;
    this.render();
    state.listenReady();
  }
  render() {
    const style = document.createElement("style");

    style.innerHTML = `
   .sharecode__container-text{
        display: flex;
        flex-direction: column;
        margin: 0 auto;
        justify-content: space-between;
        height: 250px;
        text-align: center;
    }
    .h3{
    font-size: 30px;
    }
    .code{
    font-size: 40px;

    }
    .button__code{
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    }
    .new-initiation{ 
      justify-content: space-evenly;
      padding-top: 0;
    }
   
    .waiting__container-text{
      margin: 50px 0;
      text-align:center;
    }
`;

    this.innerHTML = `
    <header-comp class="nose"></header-comp>
      <div class="initiation__container new-initiation">
      <div class="waiting__container-text">
          <h3 class="h3">Esperando a que</h3>
          <h2 class="code">${this.rivalName}</h2>
          <h3 class="h3">presione ¡Jugar!...</h3>
      </div>


      <div class="initiation__container-hands">
        <my-hands material="piedra"></my-hands>
        <my-hands material="papel"></my-hands>
        <my-hands material="tijera"></my-hands>
      </div>
  </div>
  `;

    this.appendChild(style);
  }
}
customElements.define("waiting-rival", WaitingPage);
