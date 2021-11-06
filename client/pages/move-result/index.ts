const tijeraIMG = require("url:../../img/tijera.png");
const piedraIMG = require("url:../../img/piedra.png");
const papelIMG = require("url:../../img/papel.png");

import { Router } from "@vaadin/router";
import { state } from "../../state";

export class Result extends HTMLElement {
  rivalChoice: string;
  choice: string;

  connectedCallback() {
    const currentState = state.getState();
    this.rivalChoice = currentState.rivalChoice;
    this.choice = currentState.choice;

    this.render();
    const whoWins: any = state.whoWins();
    state.setReadyFalse();
    setTimeout(() => {
      if (whoWins == "ganaste") {
        Router.go("/result/win");
      } else if (whoWins == "perdiste") {
        Router.go("/result/lose");
      } else {
        Router.go("/result/equal");
      }
    }, 3000);
  }
  render() {
    const style = document.createElement("style");
    style.innerHTML = `

.rotate{
    transform: rotate(180deg);        
  }
  .hands{
    width: 100%;
    height: 100%;

    .move__hands-selected {
        height: 40%;
      }
      .game__animation-down {
        animation: fade-in-down 1s forwards;
      }
      @keyframes fade-in-down {
        0% {
          opacity: 0;
          transform: translateY(-100%);
        }
        100% {
          opacity: 1;
          transform: translateY(-30%);
        }
      }
      .game__animation-up {
        animation: fade-in-up 1.2s forwards;
      }
      @keyframes fade-in-up {
        0% {
          opacity: 0;
          transform: translateY(100%);
        }
        100% {
          opacity: 1;
          transform: translateY(30%);
        }
      }
      .game__times-up-container {
        height: 100vh;
        width: 80vw;
        padding-top: 135px;
        display: grid;
        max-width: 400px;
        gap: 40px;
      }

`;
    // this.className = "result__container";
    const div = document.createElement("div");
    // div.className = "rival-choice";

    if (this.rivalChoice == "papel") {
      div.innerHTML = `
          <div class="move_container move__rivalhands-container">
              <div class="move__hands-selected game__animation-down">
                  <img src=${papelIMG} class="rotate hands">
              </div>
          </div>
        `;
    }
    if (this.rivalChoice == "piedra") {
      div.innerHTML = `
          <div class="move_container move__rivalhands-container">
              <div class="move__hands-selected game__animation-down">
                  <img src=${piedraIMG} class="rotate hands">
              </div>
          </div>
        `;
    }
    if (this.rivalChoice == "tijera") {
      div.innerHTML = `
          <div class="move_container move__rivalhands-container">
              <div class="move__hands-selected game__animation-down">
                  <img src=${tijeraIMG} class="rotate hands">
              </div>
          </div>
        `;
    }

    if (this.choice == "tijera") {
      this.innerHTML = `
          <div class="move_container move__myhands-container">
              <div class="move__hands-selected game__animation-up">
                  <img src=${tijeraIMG} class="hands">
              </div>
          </div>
          `;
    }
    if (this.choice == "piedra") {
      this.innerHTML = `
          <div class="move_container move__myhands-container">
              <div class="move__hands-selected game__animation-up">
                  <img src=${piedraIMG} class="hands">
              </div>
          </div>
          `;
    }
    if (this.choice == "papel") {
      this.innerHTML = `
          <div class="move_container move__myhands-container">
              <div class="move__hands-selected game__animation-up">
                  <img src=${papelIMG} class="hands">
              </div>
          </div>
          `;
    }

    this.appendChild(style);
    this.appendChild(div);
  }
}
customElements.define("result-page", Result);
