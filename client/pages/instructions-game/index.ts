import { Router } from "@vaadin/router";
import { state } from "../../state";

class InstructionPage extends HTMLElement {
  connectedCallback() {
    state.getRivalInfo(() => {
      this.render();
      const button = document.querySelector(".button");
      button.addEventListener("click", () => {
        state.setReadyTrue();
        Router.go("/waiting");
      });
    });
  }
  render() {
    const style = document.createElement("style");

    style.innerHTML = `
    .header__container{
      width: 100%;
      heigth: 60px;
    }
    .header__names-container{
      display:flex;
      justify-content: space-around;
    }
    .new-initiation{ 
      justify-content: space-evenly;
      padding-top: 0;
    }
    .new-button{
      margin: 0;
    }
    .new-hands{
      margin-top:0;
    }
   
   
`;
    this.innerHTML = `
    <header-comp class="nose"></header-comp>
    <div class="initiation__container new-initiation">
    <div class="initiation__container-text">
        <my-text variant="instrucciones">Presioná jugar y elegí: piedra, papel o tijera antes de que pasen los 2 segundos.</my-text>
    </div>
    <div class="initiation__container-button new-button">
        <my-button variant="blue" class="button">¡Jugar!</my-button>
    </div>
    <div class="initiation__container-hands new-hands">
      <my-hands material="piedra"></my-hands>
      <my-hands material="papel"></my-hands>
      <my-hands material="tijera"></my-hands>
    </div>
</div>
`;
    this.appendChild(style);
  }
}
customElements.define("instruction-page", InstructionPage);
