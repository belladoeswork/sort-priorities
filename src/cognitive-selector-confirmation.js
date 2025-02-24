import { LitElement, html, css } from 'lit';
import { MoodRouter } from './mood-router.js';

// Import the arrow image
const arrowIcon = new URL('/assets/arrow-right.png', import.meta.url).href;

export class CognitiveNeedConfirmation extends LitElement {
  static get tag() {
    return 'cognitive-need-confirmation';
  }

  static get properties() {
    return {
      mood: { type: String },
      backgroundColor: { type: String },
      selectedButtons: { type: Array },
      needsList: { type: Array }
    };
  }

  constructor() {
    super();
    this.mood = '';
    this.backgroundColor = sessionStorage.getItem('selectedMoodColor') || '#FFFFFF';
    this.selectedButtons = [];
    this.needsLists = {
      // Red emotions (FEDDDE)
      "#FEDDDE": [
        'Safety', 'Respect', 'Consideration', 'Space',
        'Understanding', 'Clarity'
      ],
      // Yellow emotions (FFEFC7)
      "#FFEFC7": [
        'Achievement', 'Growth', 'Progress', 'Success',
        'Recognition', 'Appreciation'
      ],
      // Blue emotions (D8E5FF)
      "#D8E5FF": [
        'Connection', 'Understanding', 'Empathy', 'Support',
        'Comfort', 'Care'
      ],
      // Green emotions (CFEFE7)
      "#CFEFE7": [
        'Peace', 'Balance', 'Harmony', 'Stability',
        'Connection', 'Understanding'
      ]
    };
    // Set the appropriate needs list based on the background color
    this.needsList = [
      ...this.needsLists["#FEDDDE"],
      ...this.needsLists["#FFEFC7"],
      ...this.needsLists["#D8E5FF"],
      ...this.needsLists["#CFEFE7"]
    ];
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }

      .container {
        min-height: 100vh;
        padding: 20px;
        background-color: white;
        position: relative;
      }

      .header {
        font-size: 19px;
        color: #2F3336;
        margin: 20px;
        line-height: 1.5;
        text-align: center;
      }

      .grid-container {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 10px;
        padding: 20px;
        max-width: 1000px;
        margin: 0 auto;
      }

      .grid-button {
        aspect-ratio: 1;
        border: 1px solid #ccc;
        border-radius: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        padding: 10px;
        cursor: pointer;
        transition: all 0.3s ease;
        text-align: center;
        background-color: white;
      }

      .grid-button.selected {
        filter: brightness(85%);
        transform: scale(0.98);
      }

      .back-button {
        display: none;
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

  handleButtonClick(index) {
    if (this.selectedButtons.includes(index)) {
      this.selectedButtons = this.selectedButtons.filter(i => i !== index);
    } else {
      if (this.selectedButtons.length < 3) {
        this.selectedButtons = [...this.selectedButtons, index];
        
        // If we've reached 3 selections, navigate to comparison view
        if (this.selectedButtons.length === 3) {
          // Get the selected needs
          const selectedNeeds = this.selectedButtons.map(i => this.needsList[i]);
          
          // Store selected needs in sessionStorage before navigation
          sessionStorage.setItem('selectedNeeds', JSON.stringify(selectedNeeds));
          
          // Create and configure the comparison view
          const comparisonView = document.createElement('cognitive-selector-needs-comparison');
          comparisonView.selectedNeeds = selectedNeeds;
          comparisonView.backgroundColor = this.backgroundColor;
          comparisonView.mood = this.mood;
          
          // Replace current view with comparison view
          this.parentNode.replaceChild(comparisonView, this);
          
          // Update URL
          window.history.pushState({}, '', `/${this.mood}/needs-comparison`);
        }
      }
    }
    this.requestUpdate();
  }

  handleBackClick() {
    // Get the category from the URL
    const urlParts = window.location.pathname.split('/');
    const category = urlParts[1]; // This will be the mood category
    
    // Update URL to go back to detail view
    window.history.pushState({}, '', `/${category}`);
    
    // Use router to handle the navigation
    MoodRouter.handleRoute(`/${category}`);
  }

  render() {
    return html`
      <div class="container">
        <div class="header">
          What needs might cause you feeling ${this.mood} when you think that "Everybody hates me" ?
        </div>
        <div class="grid-container">
          ${this.needsList.map((need, index) => html`
            <button 
              class="grid-button ${this.selectedButtons.includes(index) ? 'selected' : ''}"
              @click=${() => this.handleButtonClick(index)}
            >
              ${need}
            </button>
          `)}
        </div>
      </div>
    `;
  }
}

customElements.define(CognitiveNeedConfirmation.tag, CognitiveNeedConfirmation); 


{/* <div class="click-text">Click here!</div>
<div class="arrow-container" @click=${this.handleBackClick}>
  <img class="arrow-image" src="${arrowIcon}" alt="Go back">
</div> */}