import { LitElement, html, css } from 'lit';

const arrowIcon = new URL('../../assets/arrow-right.png', import.meta.url).href;

export class PolarisMoodConfirmation extends LitElement {
  static get tag() {
    return 'polaris-mood-confirmation';
  }

  static get properties() {
    return {
      mood: { type: String },
      backgroundColor: { type: String }
    };
  }

  constructor() {
    super();
    this.mood = '';
    this.backgroundColor = sessionStorage.getItem('selectedMoodColor') || '#FFFFFF';
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }

      .container {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: 20px;
        transition: background-color 0.3s ease;
        position: relative;
      }

      .message {
        font-size: 24px;
        color: #2F3336;
        margin-bottom: 20px;
        max-width: 600px;
        line-height: 1.5;
      }

      .selected-mood {
        font-size: 28px;
        font-weight: bold;
        margin: 20px 0;
      }

      .arrow-container {
        position: absolute;
        bottom: 40px;
        right: 40px;
        cursor: pointer;
        width: 100px;
        height: 100px;
      }

      .arrow-container img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    `;
  }

  handleBackClick() {
    const mainView = document.createElement('polaris-mood');
    this.parentNode.replaceChild(mainView, this);
    window.history.pushState({}, '', '/mood');
  }

  render() {
    return html`
      <div class="container" style="background-color: ${this.backgroundColor}">
        <div class="message">
          Great job in specifying your emotion.
        </div>
        <div class="selected-mood">
          ${this.mood}
        </div>
        <div class="arrow-container" @click=${this.handleBackClick}>
          <img src="${arrowIcon}" alt="Return to start">
        </div>
      </div>
    `;
  }
}

customElements.define(PolarisMoodConfirmation.tag, PolarisMoodConfirmation); 