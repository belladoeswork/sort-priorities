import { LitElement, html, css } from 'lit';
import { MoodRouter } from './mood-router.js';

export class CognitiveSelectorDetail extends LitElement {
  static get tag() {
    return 'cognitive-selector-detail';
  }

  static get properties() {
    return {
      mood: { type: String },
      moodOptions: { type: Object },
      searchQuery: { type: String },
      searchTerm: { type: String },
    };
  }

  constructor() {
    super();
    this.mood = '';
    this.searchQuery = '';
    this.searchTerm = '';
    this.moodOptions = {};
    this.isSearching = false;
  }

  static get styles() {
    return css`
      :host {
        display: block;
        position: relative;
        width: 100%;
        height: 100vh;
        overflow-y: auto;
        background-color: #ffffff;
      }

      .container {
        position: relative;
        min-height: 100vh;
        padding-top: 160px; /* Increased to account for flexible header height */
      }

      .header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        width: 100vw; /* Use viewport width */
        height: auto;
        background: white;
        padding: 16px 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        display: flex;
        flex-direction: column;
        gap: 16px;
        z-index: 9999;
        box-sizing: border-box; /* Include padding in width calculation */
      }

      h2 {
        margin: 0;
        font-size: 18px;
        line-height: 1.3;
        color: #2F3336;
        font-weight: 600;
        text-align: center;
        padding: 0;
        width: 100%;
        max-width: 100%; /* Ensure text doesn't cause overflow */
      }

      .header-controls {
        display: flex;
        align-items: center;
        gap: 8px;
        width: 100%;
        box-sizing: border-box;
      }

      .search-container {
        display: flex;
        align-items: center;
        gap: 8px;
        flex: 1;
        min-width: 0;
      }

      .back-button {
        height: 40px;
        padding: 0 16px;
        border-radius: 20px;
        border: none;
        background: #FFECBA;
        color: #2F3336;
        font-weight: 500;
        cursor: pointer;
        font-size: 16px;
        white-space: nowrap;
        flex-shrink: 0;
      }

      .search-button {
        height: 40px;
        min-width: fit-content;
        padding: 0 16px;
        border-radius: 20px;
        border: none;
        background: #FFECBA;
        color: #2F3336;
        font-weight: 500;
        cursor: pointer;
        font-size: 16px;
        white-space: nowrap;
        flex-shrink: 0;
        margin-right: 8px; /* Add margin to prevent button from touching edge */
      }

      .search-input {
        flex: 1;
        height: 40px;
        padding: 0 16px;
        border-radius: 20px;
        border: none;
        background: #F8F8F8;
        color: #2F3336;
        font-size: 16px;
        min-width: 0;
      }

      .quadrant-grid {
        position: relative;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        gap: 4px;
        width: 100%;
        height: calc(100vh - 160px); /* Update to match new header spacing */
        margin-top: -20px;
      }

      .mood-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(3, 1fr);
        gap: 4px;
        padding: 4px;
        transition: all 0.3s ease-in-out;
      }

      .mood-button {
        aspect-ratio: 1;
        border-radius: 12px;
        padding: 8px;
        margin: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        font-size: 12px;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        min-width: 70px;
        min-height: 70px;
      }

      .highlighted {
        transform: scale(1.1);
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        z-index: 2;
      }

      .selected-category {
        background: rgba(255, 255, 255, 0.6);
        border-radius: 16px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        transform: scale(1.02);
        transform-origin: center center;
        margin: 8px;
      }

      .selected-category .mood-button {
        transform: scale(1.02);
      }
    `;
  }

  firstUpdated() {
    // Scroll to selected category after component first renders
    if (this.mood) {
      const selectedGrid = this.shadowRoot.querySelector(`.${this.mood}`);
      if (selectedGrid) {
        selectedGrid.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }

  handleMoodSelect(selectedMood) {
    // Get the category and color for the selected mood
    let selectedCategory = '';
    let backgroundColor = '';
    for (const [category, moods] of Object.entries(this.moodOptions)) {
      if (moods.some(mood => mood.text === selectedMood)) {
        selectedCategory = category;
        backgroundColor = this.moodOptions[category].find(
          mood => mood.text === selectedMood
        ).color;
        break;
      }
    }

    // Store the background color and moodOptions
    sessionStorage.setItem('selectedMoodColor', backgroundColor);
    sessionStorage.setItem('moodOptions', JSON.stringify(this.moodOptions));
    
    // Create confirmation view
    const confirmationView = document.createElement('polaris-mood-confirmation');
    confirmationView.mood = selectedMood;
    confirmationView.backgroundColor = backgroundColor;
    
    // Replace current view with confirmation view
    this.parentNode.replaceChild(confirmationView, this);
    
    // Update URL (changed from /mood/confirmation/${selectedMood})
    window.history.pushState({}, '', `/${this.mood}/confirmation/${encodeURIComponent(selectedMood)}`);

    // Dispatch event for any parent components that need to know
    this.dispatchEvent(new CustomEvent('mood-selected', {
      detail: { mood: selectedMood },
      bubbles: true,
      composed: true
    }));
  }

  handleBackClick() {
    // Update URL to home
    window.history.pushState({}, '', '/');
    
    // Use router to handle the navigation
    MoodRouter.handleRoute('/');
  }

  handleSearch() {
    this.isSearching = true;
    // Store the search term before clearing input
    this.searchTerm = this.searchQuery;
    // Clear only the input
    this.searchQuery = '';
    this.requestUpdate();
  }

  render() {
    const categories = {
      'high-unpleasant': { color: '#FEDDDE' },
      'high-pleasant': { color: '#FFEFC7' },
      'low-unpleasant': { color: '#D8E5FF' },
      'low-pleasant': { color: '#CFEFE7' }
    };

    return html`
      <div class="container">
        <div class="header">
          <h2>How do you feel after such a thought?</h2>
          <div class="header-controls">
            <button class="back-button" @click=${this.handleBackClick}>
              Back
            </button>
            <div class="search-container">
              <input
                type="text"
                class="search-input"
                placeholder="Search moods..."
                .value=${this.searchQuery}
                @input=${(e) => this.searchQuery = e.target.value}
                @keyup=${(e) => e.key === 'Enter' && this.handleSearch()}
              >
              <button class="search-button" @click=${this.handleSearch}>
                Search
              </button>
            </div>
          </div>
        </div>

        <div class="quadrant-grid">
          ${Object.entries(categories).map(([categoryId, category]) => html`
            <div class="mood-grid ${categoryId} ${categoryId === this.mood ? 'selected-category' : ''}">
              ${(this.moodOptions[categoryId] || []).map(option => html`
                <div
                  class="mood-button ${this.isSearching && 
                    this.searchTerm && 
                    option.text.toLowerCase().includes(this.searchTerm.toLowerCase()) ? 
                    'highlighted' : ''}"
                  style="background-color: ${option.color}; opacity: ${option.intensity / 100}"
                  @click=${() => this.handleMoodSelect(option.text)}
                >
                  ${option.text}
                </div>
              `)}
            </div>
          `)}
        </div>
      </div>
    `;
  }
}

customElements.define(CognitiveSelectorDetail.tag, CognitiveSelectorDetail); 