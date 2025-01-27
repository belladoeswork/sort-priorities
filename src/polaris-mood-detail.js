import { LitElement, html, css } from 'lit';

export class PolarisMoodDetail extends LitElement {
  static get tag() {
    return 'polaris-mood-detail';
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
      }

      .container {
        padding: 16px;
      }

      .header {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 16px;
      }

      .quadrant-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        gap: 4px;
        max-width: 1400px;
        margin: 0 auto;
        padding: 8px;
      }

      .mood-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(5, 1fr);
        gap: 8px;
        padding: 8px;
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
        font-size: 14px;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        min-width: 80px;
        min-height: 80px;
      }

      .highlighted {
        transform: scale(1.1);
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        z-index: 2;
      }

      .back-button {
        padding: 8px 16px;
        border-radius: 20px;
        border: none;
        background: #D6D0FD;
        color: #2F3336;
        cursor: pointer;
        font-size: 14px;
        font-family: inherit;
      }

      .search-container {
        display: flex;
        gap: 8px;
        align-items: center;
      }

      .search-input {
        padding: 8px 16px;
        border-radius: 20px;
        border: none;
        background: #F5F5F5;
        color: #2F3336;
        font-size: 14px;
        font-family: inherit;
        width: 200px;
      }

      .search-button {
        padding: 8px 16px;
        border-radius: 20px;
        border: none;
        background: #D6D0FD;
        color: #2F3336;
        cursor: pointer;
        font-size: 14px;
        font-family: inherit;
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
    for (const [category, moods] of Object.entries(this.moodOptions)) {
      if (moods.some(mood => mood.text === selectedMood)) {
        selectedCategory = category;
        break;
      }
    }

    // Create confirmation view
    const confirmationView = document.createElement('polaris-mood-confirmation');
    confirmationView.mood = selectedMood;
    confirmationView.backgroundColor = this.moodOptions[selectedCategory].find(
      mood => mood.text === selectedMood
    ).color;
    
    // Replace current view with confirmation view
    this.parentNode.replaceChild(confirmationView, this);
    
    // Update URL
    window.history.pushState({}, '', `/mood/confirmation/${selectedMood}`);

    // Dispatch event for any parent components that need to know
    this.dispatchEvent(new CustomEvent('mood-selected', {
      detail: { mood: selectedMood },
      bubbles: true,
      composed: true
    }));
  }

  handleBackClick() {
    // Create main mood view
    const mainView = document.createElement('polaris-mood');
    
    // Replace detail view with main view
    this.parentNode.replaceChild(mainView, this);
    
    // Update URL
    window.history.pushState({}, '', '/mood');
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
          <button class="back-button" @click=${this.handleBackClick}>
            ← Back
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

customElements.define(PolarisMoodDetail.tag, PolarisMoodDetail); 