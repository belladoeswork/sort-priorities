import { LitElement, html, css } from 'lit';
import { MoodRouter } from './mood-router.js';


const arrowIcon = new URL('/assets/arrow-right.png', import.meta.url).href;

export class CognitiveSelectorNeedsComparison extends LitElement {
  static get tag() {
    return 'cognitive-selector-needs-comparison';
  }

  static get properties() {
    return {
      selectedNeeds: { type: Array },
      backgroundColor: { type: String },
      mood: { type: String },
      selectedOption: { type: String },
      isCorrect: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.selectedNeeds = JSON.parse(sessionStorage.getItem('selectedNeeds') || '[]');
    this.backgroundColor = sessionStorage.getItem('selectedMoodColor') || '#FFFFFF';
    this.mood = '';
    this.selectedOption = null;
    this.isCorrect = false;
  }

  connectedCallback() {
    super.connectedCallback();
    // Create shuffled pairs when component is connected to DOM
    this.shuffledPairs = this._createRandomPairs();
    this.requestUpdate();
  }

  _createRandomPairs() {
    if (!this.selectedNeeds || this.selectedNeeds.length < 2) {
      return { leftNeed: '', rightNeed: '', biasNeed: '' };
    }

    // Get two different random needs from the selected needs array
    const shuffledNeeds = [...this.selectedNeeds].sort(() => Math.random() - 0.5);
    
    // Classify which need represents a cognitive bias (now with quotes)
    const cognitiveNeeds = ['Recognition', 'Validation', 'Acceptance', 'Worth', 'Attention', 'Fairness', 'Justice', 'Achievement', 'Success', 'Appreciation', 'Status', 'Impact', 'Value'];
    
    // Determine which of our shuffled needs is the cognitive bias
    const need1 = shuffledNeeds[0];
    const need2 = shuffledNeeds[1];
    
    // Find which need is the cognitive bias
    const biasNeed = cognitiveNeeds.includes(need1) ? need1 : 
                     cognitiveNeeds.includes(need2) ? need2 : need1;
    
    // Randomly decide which position (left/right) to put each need
    const shouldSwap = Math.random() > 0.5;
    
    return {
      leftNeed: shouldSwap ? need2 : need1,
      rightNeed: shouldSwap ? need1 : need2,
      biasNeed: biasNeed
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        min-height: 100vh;
        background-color: white;
        width: 100%;
      }

      .container {
        min-height: 100vh;
        padding: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        box-sizing: border-box;
      }

      .header {
        font-size: 19px;
        color: #2F3336;
        margin: 0 20px 40px;
        line-height: 1.5;
        text-align: center;
        width: 100%;
      }

      .options-container {
        display: flex;
        flex-direction: row;
        gap: 20px;
        width: 100%;
        max-width: 800px;
        padding: 20px;
        box-sizing: border-box;
        justify-content: center;
        margin-bottom: 160px;
      }



      .option-button {
        width: 160px;
        height: 160px;
        border: 1px solid #ccc;
        border-radius: 12px;
        padding: 20px;
        font-size: 20px;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        background-color: white;
        box-sizing: border-box;
        margin: 0;
      }

      .option-button:hover {
        transform: scale(1.02);
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      }

      .option-button.correct {
        background-color: #CFEFE7 !important;
      }

      .option-button.incorrect {
        background-color: #FEDDDE !important;
      }

      .feedback-text {
        margin-top: 10px;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
      }

      .feedback-icon {
        font-size: 18px;
      }

      .feedback-icon.correct {
        color: #4CAF50;  /* Green color for checkmark */
      }

      .feedback-icon.incorrect {
        color: #F44336;  /* Red color for X */
      }

      .arrow-container {
        position: fixed;
        bottom: 20px;
        right: 60px;
        width: 100px;
        height: 100px;
        cursor: pointer;
        transform: rotate(15deg);
        transition: transform 0.3s ease;
      }

      .arrow-image {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }

      .click-text {
        position: fixed;
        bottom: 120px;
        right: 120px;
        font-size: 18px;
        color: #2F3336;
        font-family: 'Comic Sans MS', cursive;
        pointer-events: none;
        text-shadow: 1px 1px 2px white;
      }
    `;
  }

  handleOptionSelect(selectedNeed) {
    this.selectedOption = selectedNeed;
    // Compare against the actual bias need, regardless of position
    this.isCorrect = selectedNeed === this.shuffledPairs.biasNeed;
    this.requestUpdate();
  }

  render() {
    return html`
      <div class="container">
        <div class="header">
          <h1>Which one is the cognitive bias?</h1>
        </div>
        
        <div class="options-container">
          <div class="option-wrapper">
            <button 
              class="option-button ${this.selectedOption === this.shuffledPairs.leftNeed ? 
                (this.isCorrect ? 'correct' : 'incorrect') : ''}"
              @click=${() => this.handleOptionSelect(this.shuffledPairs.leftNeed)}
              ?disabled=${this.selectedOption !== null}
            >
              ${this.shuffledPairs.leftNeed}
            </button>
            ${this.selectedOption === this.shuffledPairs.leftNeed ? html`
              <div class="feedback-text">
                ${this.isCorrect ? 
                  html`<span class="feedback-icon correct">✓</span> Correct` : 
                  html`<span class="feedback-icon incorrect">✗</span> Wrong. ${this.shuffledPairs.biasNeed} is the cognitive bias.`
                }
              </div>
            ` : ''}
          </div>

          <div class="option-wrapper">
            <button 
              class="option-button ${this.selectedOption === this.shuffledPairs.rightNeed ? 
                (this.isCorrect ? 'correct' : 'incorrect') : ''}"
              @click=${() => this.handleOptionSelect(this.shuffledPairs.rightNeed)}
              ?disabled=${this.selectedOption !== null}
            >
              ${this.shuffledPairs.rightNeed}
            </button>
            ${this.selectedOption === this.shuffledPairs.rightNeed ? html`
              <div class="feedback-text">
                ${this.isCorrect ? 
                  html`<span class="feedback-icon correct">✓</span> Correct` : 
                  html`<span class="feedback-icon incorrect">✗</span> Wrong. ${this.shuffledPairs.biasNeed} is the cognitive bias.`
                }
              </div>
            ` : ''}
          </div>
        </div>
        <div class="click-text">Click here!</div>
        <div class="arrow-container" @click=${this.handleBackClick}>
          <img class="arrow-image" src="${arrowIcon}" alt="Go back">
        </div>
      </div>
    `;
  }
}

customElements.define(CognitiveSelectorNeedsComparison.tag, CognitiveSelectorNeedsComparison); 