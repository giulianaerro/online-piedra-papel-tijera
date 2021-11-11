import { Router } from "@vaadin/router";
import { state } from "../../../state";
export class Equal extends HTMLElement {
  rivalScore: string;
  score: string;

  connectedCallback() {
    const currentState = state.getState();

    this.rivalScore = currentState.rivalScore;
    this.score = currentState.score;

    this.render();
    state.pushWinner();
  }

  render() {
    const div = document.createElement("div");
    div.classList.add("result-equal__main-container");
    div.innerHTML = `
    <div class="result-equal__result-img-container">
        <result-img result="Empataste">Empataste</result-img>
    </div>

    <div class="result-equal__score-container">
        <my-text variant="score">Puntuación:</my-text>
      <div class="result-equal__score">
        <my-text variant="results">Yo: ${this.score}</my-text>
        <my-text variant="results">Rival: ${this.rivalScore}</my-text>
      </div>
    </div>

    <div class="result__container-button">
      <my-button variant="blue" class="button-blue">Volver a Jugar</my-button>
      <my-button variant="red" class="button-red">Volver al Inicio</my-button>
      </div>
      `;
    const playAgainButton = div.querySelector(".button-blue");
    const inicio = div.querySelector(".button-red");

    inicio.addEventListener("click", () => {
      Router.go("/");
    });
    playAgainButton.addEventListener("click", () => {
      Router.go("/instruction");
    });
    this.appendChild(div);
  }
}
customElements.define("result-equal", Equal);
