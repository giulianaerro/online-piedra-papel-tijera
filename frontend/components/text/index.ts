customElements.define(
  "my-text",
  class extends HTMLElement {
    shadow: ShadowRoot;
    variant: string;

    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
      this.variant = this.getAttribute("variant") || "body";
    }
    connectedCallback() {
      this.render();
    }
    render() {
      const div = document.createElement("div");
      const style = document.createElement("style");

      style.innerHTML = `
          .title{
            color: #009048;
            font-size: 90px;
            font-weight: bold;
          }
          .instrucciones{
            color: black;
            font-size: 40px;
          }

          .score{
            font-size: 28px;
            font-weight: bold;
          }
          .results {
            font-size: 22px;
            margin: 5px;
          }
            `;

      div.className = this.variant;
      div.textContent = this.textContent;

      this.shadow.appendChild(div);
      this.shadow.appendChild(style);
    }
  }
);
