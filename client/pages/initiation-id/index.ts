class InitiationId extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  render() {
    const style = document.createElement("style");

    style.innerHTML = `
      .input{
          margin-top: 30px;
        margin-bottom: 10px;
          color:black;
          border: 8px solid black;
          border-radius: 8px;
          width: 100%;
          max-width: 404px;
          padding: 9px;
          font-size: 35px;
          font-family: "Roboto", sans-serif;
       
        }
        input::placeholder{
          text-align: center;
          font-size:25px;
      }
      `;
    this.innerHTML = `
    <div class="welcome__container">
    <div class="welcome__container-title">
        <my-text variant="title">Piedra, Papel, ó Tijera</my-text>
    </div>
    <div class="welcome__container-button">
        <input class="input" type="text" placeholder="CÓDIGO">
        <my-button variant="blue" class="button">Ingresar a la sala</my-button>
        </div>
    <div class="welcome__container-hands">
        <my-hands material="piedra"></my-hands>
        <my-hands material="papel"></my-hands>
        <my-hands material="tijera"></my-hands>
    </div>
  </div>
    `;
    this.appendChild(style);
  }
}
customElements.define("initiationid-page", InitiationId);
