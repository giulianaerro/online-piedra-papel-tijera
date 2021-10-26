import { Router } from "@vaadin/router";

class InstructionPage extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  render() {
    this.innerHTML = `
    <div class="initiation__container">
    <div class="initiation__container-text">
        <my-text variant="instrucciones">Presioná jugar y elegí: piedra, papel o tijera antes de que pasen los 3 segundos.</my-text>
    </div>
    <div class="initiation__container-button">
        <my-button variant="blue" class="button">¡Jugar!</my-button>
    </div>
    <div class="initiation__container-hands">
      <my-hands material="piedra"></my-hands>
      <my-hands material="papel"></my-hands>
      <my-hands material="tijera"></my-hands>
    </div>
</div>
`;
  }
}
customElements.define("instruction-page", InstructionPage);
