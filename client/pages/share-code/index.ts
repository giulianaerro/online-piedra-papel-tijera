import { state } from "../../state";

class ShareCodePage extends HTMLElement {
  roomId: string;
  connectedCallback() {
    const currentState = state.getState();
    this.roomId = currentState.roomId;
    this.render();
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
`;

    this.innerHTML = `
      <div class="initiation__container">
      <div class="sharecode__container-text">
          <h3 class="h3">Compartí el código:</h3>
          <h2 class="code">${this.roomId}</h2>
          <h3 class="h3">Con tu contrincante</h3>
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
customElements.define("sharecode-page", ShareCodePage);
