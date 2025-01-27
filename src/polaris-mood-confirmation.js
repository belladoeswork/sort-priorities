import { LitElement, html, css } from 'lit';

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
    this.backgroundColor = '#FFFFFF';
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

      .back-button {
        padding: 12px 24px;
        border-radius: 20px;
        border: none;
        background: #D6D0FD;
        color: #2F3336;
        cursor: pointer;
        font-size: 16px;
        font-family: inherit;
        margin-top: 40px;
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
          Congratulations on taking the first step to better mental health
        </div>
        <div class="selected-mood">
          You're feeling: ${this.mood}
        </div>
        <button class="back-button" @click=${this.handleBackClick}>
          Return to Start
        </button>
      </div>
    `;
  }
}

customElements.define(PolarisMoodConfirmation.tag, PolarisMoodConfirmation); 