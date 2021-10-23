customElements.define(
  "my-button",
  class extends HTMLElement {
    shadow: ShadowRoot;
    variant: string;

    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
      this.variant = this.getAttribute("variant");
    }
    connectedCallback() {
      this.render();
    }
    render() {
      const button = document.createElement("button");
      const style = document.createElement("style");

      style.innerHTML = `
        .blue{
            background-color: #006CFC;
            border: 8px solid #001997;
            border-radius: 8px;
            width: 100%;
            max-width: 404px;
            padding-top: 9px;
            padding-bottom: 9px;
            font-family: "Odibee Sans", cursive;
            color: #fff;
            font-size: 35px;
            cursor: pointer;
            font-family: "Roboto", sans-serif;

        }
        .red{ 
          background-color: #D22619;
          border: 8px solid #821813;
          border-radius: 8px;
          width: 100%;
          max-width: 404px;
          padding-top: 9px;
          padding-bottom: 9px;
          font-family: "Odibee Sans", cursive;
          color: #fff;
          font-size: 35px;
          cursor: pointer;
          font-family: "Roboto", sans-serif;

      }
          `;
      button.textContent = this.textContent;
      button.className = this.variant;
      this.shadow.appendChild(button);
      this.shadow.appendChild(style);
    }
  }
);
