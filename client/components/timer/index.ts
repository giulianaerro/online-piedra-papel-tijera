customElements.define(
  "countdown-timer",
  class extends HTMLElement {
    shadow: ShadowRoot;
    contador: number = 3;
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
      this.contador = JSON.parse(this.textContent);
    }
    connectedCallback() {
      this.render();
    }
    render() {
      const style = document.createElement("style");
      style.innerHTML = `
          .shrink-animation {
              position: relative;
              top: -135px;
              left: 2px;
              font-size: 40px;
              color: #000;
          
              animation-name: shrink;
              animation-duration: 1s;
              animation-iteration-count: ${(this.contador + 1).toString()};
          }
        
          
          @keyframes shrink {
              from {
                  transform: scale(3.800);
              }
          
              to {
                  transform: scale(2.7);
              }
          }
          
          .spin {
              display: inline-block;
              width: 180px;
              height: 180px;
              border: 15px solid black;
              border-radius: 50%;
          }
          .time-end{
              display: none;
          }
          
          `;
      const divContainerEl = document.createElement("div");

      divContainerEl.style.textAlign = "center";

      const divSpinAnimationEl = document.createElement("div");
      divSpinAnimationEl.classList.add("spin");

      const divTimerEl = document.createElement("div");
      divTimerEl.classList.add("shrink-animation");
      divTimerEl.textContent = this.textContent;

      divTimerEl.addEventListener("animationiteration", () => {
        this.contador--;
        divTimerEl.textContent = this.contador.toString();
      });
      divTimerEl.addEventListener("animationend", () => {
        divContainerEl.style.display = "none";
        divTimerEl.className = "time-end";
      });
      divContainerEl.appendChild(divSpinAnimationEl);
      divContainerEl.appendChild(divTimerEl);
      this.shadow.appendChild(style);
      this.shadow.appendChild(divContainerEl);
    }
  }
);
