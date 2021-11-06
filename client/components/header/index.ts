import { state } from "../../state";

customElements.define(
  "header-comp",
  class extends HTMLElement {
    roomId: string;
    userName: string;
    rivalName: string;
    rivalScore: string;
    score: string;

    connectedCallback() {
      const currentState = state.getState();
      this.roomId = currentState.roomId;
      this.userName = currentState.userName;
      this.rivalName = currentState.rivalName;
      this.rivalScore = currentState.rivalScore;
      this.score = currentState.score;

      this.render();
    }
    render() {
      const style = document.createElement("style");

      style.innerHTML = `
     
      .header__container{
        width: 100%;
        heigth: 60px;
        margin-top: 15px;
        font-size: 22px;
      }
      .header__names-container{
        display:flex;
        justify-content: space-around;
      }
      .header__name-two{
        color: #FF6442;
        font-weight:bold;
            }
      .header__name-one{
          color:#001997;
        font-weight:bold;
      }
      .header__room-id{
        font-weight:bold;

      }
  `;

      this.innerHTML = `
       <div class="header__container">
           <div class="header__names-container">
           <div class="header__names">
               <div class="header__name-one">${this.userName}: ${this.score}</div>
               <div class="header__name-two">${this.rivalName}: ${this.rivalScore}</div>  
           </div>    
           <div class="header__room-id-container">
               <div class="header__room-id">Sala</div>
               <div class="header__room-id-number">${this.roomId}</div>
               </div> 
           </div>
       </div>
    `;

      this.appendChild(style);
    }
  }
);
