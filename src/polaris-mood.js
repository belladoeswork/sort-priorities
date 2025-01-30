import { LitElement, html, css } from 'lit';

export class PolarisMood extends LitElement {
  static get tag() {
    return 'polaris-mood';
  }

  static get properties() {
    return {
      selectedMood: { type: String },
      searchQuery: { type: String },
      isSearchVisible: { type: Boolean },
      moodOptions: { type: Object },
    };
  }

  constructor() {
    super();
    this.selectedMood = '';
    this.searchQuery = '';
    this.isSearchVisible = false;
    this.moodOptions = {
      "high-unpleasant": [
        { text: "Angry", color: "#FEDDDE", intensity: 100 },
        { text: "Frustrated", color: "#FEDDDE", intensity: 95 },
        { text: "Tense", color: "#FEDDDE", intensity: 90 },
        { text: "Stressed", color: "#FEDDDE", intensity: 85 },
        { text: "Annoyed", color: "#FEDDDE", intensity: 80 },
        { text: "Nervous", color: "#FEDDDE", intensity: 75 },
        { text: "Irritated", color: "#FEDDDE", intensity: 70 },
        { text: "Agitated", color: "#FEDDDE", intensity: 65 },
        { text: "Enraged", color: "#FEDDDE", intensity: 60 },
        { text: "Anxious", color: "#FEDDDE", intensity: 55 },
        { text: "Upset", color: "#FEDDDE", intensity: 50 },
        { text: "Distressed", color: "#FEDDDE", intensity: 45 },
        { text: "Furious", color: "#FEDDDE", intensity: 40 },
        { text: "Outraged", color: "#FEDDDE", intensity: 35 },
        { text: "Hostile", color: "#FEDDDE", intensity: 30 },
        { text: "Terrified", color: "#FEDDDE", intensity: 50 },
        { text: "Panicked", color: "#FEDDDE", intensity: 50 },
        { text: "Shocked", color: "#FEDDDE", intensity: 50 },
        { text: "Impassioned", color: "#FEDDDE", intensity: 50 },
        { text: "Hyper", color: "#FEDDDE", intensity: 50 },
        { text: "Livid", color: "#FEDDDE", intensity: 50 },
        { text: "Irate", color: "#FEDDDE", intensity: 50 },
        { text: "Overwhelmed", color: "#FEDDDE", intensity: 50 },
        { text: "Pressured", color: "#FEDDDE", intensity: 50 },
        { text: "Restless", color: "#FEDDDE", intensity: 50 },
        { text: "Frightened", color: "#FEDDDE", intensity: 50 },
        { text: "Apprehensive", color: "#FEDDDE", intensity: 50 },
        { text: "Fomo", color: "#FEDDDE", intensity: 50 },
        { text: "Confused", color: "#FEDDDE", intensity: 50 },
        { text: "Jealous", color: "#FEDDDE", intensity: 50 },
        { text: "Scared", color: "#FEDDDE", intensity: 50 },
        { text: "Jittery", color: "#FEDDDE", intensity: 50 },
        { text: "Concerned", color: "#FEDDDE", intensity: 50 },
        { text: "Envious", color: "#FEDDDE", intensity: 50 },
        { text: "Repulsed", color: "#FEDDDE", intensity: 50 },
        { text: "Embarrassed", color: "#FEDDDE", intensity: 50 },
        { text: "Peeved", color: "#FEDDDE", intensity: 50 },
        { text: "Uneasy", color: "#FEDDDE", intensity: 50 },
        { text: "Contempt", color: "#FEDDDE", intensity: 50 },
        // { text: "Troubled", color: "#FEDDDE", intensity: 30 },
        // { text: "Worried", color: "#FEDDDE", intensity: 30 },
      ],
      "high-pleasant": [
        { text: "Excited", color: "#FFEFC7", intensity: 100 },
        { text: "Energetic", color: "#FFEFC7", intensity: 95 },
        { text: "Happy", color: "#FFEFC7", intensity: 90 },
        { text: "Joyful", color: "#FFEFC7", intensity: 85 },
        { text: "Motivated", color: "#FFEFC7", intensity: 80 },
        { text: "Inspired", color: "#FFEFC7", intensity: 75 },
        { text: "Enthusiastic", color: "#FFEFC7", intensity: 70 },
        { text: "Cheerful", color: "#FFEFC7", intensity: 65 },
        { text: "Delighted", color: "#FFEFC7", intensity: 60 },
        { text: "Thrilled", color: "#FFEFC7", intensity: 55 },
        { text: "Elated", color: "#FFEFC7", intensity: 50 },
        { text: "Upbeat", color: "#FFEFC7", intensity: 45 },
        { text: "Jubilant", color: "#FFEFC7", intensity: 40 },
        { text: "Ecstatic", color: "#FFEFC7", intensity: 35 },
        { text: "Radiant", color: "#FFEFC7", intensity: 30 },
          { text: "Surprised", color: "#FFEFC7", intensity: 50 },
          { text: "Awe", color: "#FFEFC7", intensity: 50 },
          { text: "Exhilarated", color: "#FFEFC7", intensity: 50 },
          { text: "Determined", color: "#FFEFC7", intensity: 50 },
          { text: "Successful", color: "#FFEFC7", intensity: 50 },
          { text: "Amazed", color: "#FFEFC7", intensity: 50 },
          { text: "Empowered", color: "#FFEFC7", intensity: 50 },
          { text: "Energized", color: "#FFEFC7", intensity: 50},
          { text: "Eager", color: "#FFEFC7", intensity: 50},
          { text: "Productive", color: "#FFEFC7", intensity: 50},
          { text: "Proud", color: "#FFEFC7", intensity: 50},
          { text: "Curious", color: "#FFEFC7", intensity: 50 },
          { text: "Optimistic", color: "#FFEFC7", intensity: 50},
          { text: "Pleasant", color: "#FFEFC7", intensity: 50},
          { text: "Focused", color: "#FFEFC7", intensity: 50},
          { text: "Alive", color: "#FFEFC7", intensity: 50},
          { text: "Confident", color: "#FFEFC7", intensity: 50},
          { text: "Engaged", color: "#FFEFC7", intensity: 50},
          { text: "Challenged", color: "#FFEFC7", intensity: 50},
          { text: "Accomplished", color: "#FFEFC7", intensity: 50},
          { text: "Pleased", color: "#FFEFC7", intensity: 50},
          { text: "Playful", color: "#FFEFC7", intensity: 50},
          { text: "Wishful", color: "#FFEFC7", intensity: 50},
          { text: "Hopeful", color: "#FFEFC7", intensity: 50},
      ],
      "low-unpleasant": [
    { text: "Sad", color: "#D8E5FF", intensity: 100 },
    { text: "Tired", color: "#D8E5FF", intensity: 95 },
    { text: "Bored", color: "#D8E5FF", intensity: 90 },
    { text: "Lonely", color: "#D8E5FF", intensity: 85 },
    { text: "Melancholic", color: "#D8E5FF", intensity: 80 },
    { text: "Exhausted", color: "#D8E5FF", intensity: 75 },
    { text: "Dismal", color: "#D8E5FF", intensity: 70 },
    { text: "Drained", color: "#D8E5FF", intensity: 65 },
    { text: "Gloomy", color: "#D8E5FF", intensity: 60 },
    { text: "Down", color: "#D8E5FF", intensity: 55 },
    { text: "Weary", color: "#D8E5FF", intensity: 50 },
    { text: "Dejected", color: "#D8E5FF", intensity: 45 },
    { text: "Hopeless", color: "#D8E5FF", intensity: 40 },
    { text: "Despondent", color: "#D8E5FF", intensity: 35 },
    { text: "Miserable", color: "#D8E5FF", intensity: 30 },
      { text: "Trapped", color: "#D8E5FF", intensity: 50 },
      { text: "Disgusted", color: "#D8E5FF", intensity: 50 },
      { text: "Ashamed", color: "#D8E5FF", intensity: 50 },
      { text: "Insecure", color: "#D8E5FF", intensity: 50 },
      { text: "Disheartened", color: "#D8E5FF", intensity: 50 },
      { text: "Humiliated", color: "#D8E5FF", intensity: 50 },
      { text: "Vulnerable", color: "#D8E5FF", intensity: 50 },
      { text: "Disappointed", color: "#D8E5FF", intensity: 50 },
      { text: "Meh", color: "#D8E5FF", intensity: 50 },
      { text: "Pessimistic", color: "#D8E5FF", intensity: 50 },
      { text: "Numb", color: "#D8E5FF", intensity: 50 },
      { text: "Forlorn", color: "#D8E5FF", intensity: 50 },
      { text: "Fatigued", color: "#D8E5FF", intensity: 50 },
      { text: "Guilty", color: "#D8E5FF", intensity: 50 },
      { text: "Depressed", color: "#D8E5FF", intensity: 50 },
      { text: "Spent", color: "#D8E5FF", intensity: 50 },
      { text: "Discouraged", color: "#D8E5FF", intensity: 50 },
      { text: "Disengaged", color: "#D8E5FF", intensity: 50 },
      { text: "Despair", color: "#D8E5FF", intensity: 50},
      { text: "Alienated", color: "#D8E5FF", intensity: 50},
      { text: "Nostalgic", color: "#D8E5FF", intensity: 50},
      { text: "Apathetic", color: "#D8E5FF", intensity: 50},
      { text: "Excluded", color: "#D8E5FF", intensity: 50},
      { text: "Disconnected", color: "#D8E5FF", intensity: 50},
      // { text: "Glum", color: "#D8E5FF", intensity: 30},
      // { text: "Burned Out", color: "#D8E5FF", intensity: 30},
      // { text: "Helpless", color: "#D8E5FF", intensity: 30},
  ],
  "low-pleasant": [
    { text: "Calm", color: "#CFEFE7", intensity: 100 },
    { text: "Relaxed", color: "#CFEFE7", intensity: 95 },
    { text: "Peaceful", color: "#CFEFE7", intensity: 90 },
    { text: "Content", color: "#CFEFE7", intensity: 85 },
    { text: "Serene", color: "#CFEFE7", intensity: 80 },
    { text: "Tranquil", color: "#CFEFE7", intensity: 75 },
    { text: "At ease", color: "#CFEFE7", intensity: 70 },
    { text: "Mellow", color: "#CFEFE7", intensity: 65 },
    { text: "Composed", color: "#CFEFE7", intensity: 60 },
    { text: "Gentle", color: "#CFEFE7", intensity: 55 },
    { text: "Soothed", color: "#CFEFE7", intensity: 50 },
    { text: "Placid", color: "#CFEFE7", intensity: 45 },
    { text: "Restful", color: "#CFEFE7", intensity: 40 },
    { text: "Harmonious", color: "#CFEFE7", intensity: 35 },
    { text: "Balanced", color: "#CFEFE7", intensity: 30 },
      { text: "Thoughtful", color: "#CFEFE7", intensity: 50 },
      { text: "Appreciated", color: "#CFEFE7", intensity: 50 },
      { text: "Understood", color: "#CFEFE7", intensity: 50},
      { text: "Respected", color: "#CFEFE7", intensity: 50},
      { text: "Fulfilled", color: "#CFEFE7", intensity: 50 },
      { text: "Blissful", color: "#CFEFE7", intensity: 50 },
      { text: "Chill", color: "#CFEFE7", intensity: 50},
      { text: "Comfortable", color: "#CFEFE7", intensity: 50},
    //  { text: "Compassionate", color: "#CFEFE7", intensity: 50},
      { text: "Supported", color: "#CFEFE7", intensity:50},
      { text: "Loved", color: "#CFEFE7", intensity:50},
      { text: "Connected", color: "#CFEFE7", intensity: 50},
      { text: "Sympathetic", color: "#CFEFE7", intensity: 50},
      { text: "Empathetic", color: "#CFEFE7", intensity: 50},
      { text: "Valued", color: "#CFEFE7", intensity: 50},
      { text: "Grateful", color: "#CFEFE7", intensity: 50},
      { text: "Thankful", color: "#CFEFE7", intensity: 50},
      { text: "Accepted", color: "#CFEFE7", intensity: 50},
      { text: "Moved", color: "#CFEFE7", intensity: 50},
      { text: "Carefree", color: "#CFEFE7", intensity: 50},
      { text: "Safe", color: "#CFEFE7", intensity: 50},
      { text: "Secure", color: "#CFEFE7", intensity: 50},
      { text: "Blessed", color: "#CFEFE7", intensity: 50},
      { text: "Relieved", color: "#CFEFE7", intensity: 50},
      { text: "Satisfied", color: "#CFEFE7", intensity: 50},
    ],
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        font-family: 'Lexend Deca', sans-serif;
      }

      .container {
        background: linear-gradient(to bottom, #FFFFFF, #E3F2FD);
        min-height: 100vh;
        padding: 20px;
      }

      .header {
        display: flex;
        align-items: center;
        gap: 20px;
        margin-bottom: 20px;
      }

      .mood-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
        padding: 20px;
        max-width: 600px;
        margin: 0 auto;
      }

      .mood-button {
        aspect-ratio: 1;
        border-radius: 12px;
        padding: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        font-size: 18px;
        font-weight: 600;
        color: #2F3336;
        cursor: pointer;
        transition: transform 0.2s;
        
      }

      .mood-button:hover {
        transform: scale(1.05);
      }

      .search-container {
        position: relative;
        margin-bottom: 20px;
      }

      .search-input {
        width: 100%;
        padding: 10px;
        border-radius: 25px;
        border: none;
        background: #D6D0FD;
        font-size: 16px;
      }
    `;
  }

  handleMoodSelect(mood) {
    // Dispatch a custom event that will be used for navigation
    const event = new CustomEvent('mood-category-selected', {
      detail: { mood },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
    
    // Update URL to reflect the selected mood (optional, for browser history)
    window.history.pushState({}, '', `/mood/${mood}`);
    
    // Show the detail view
    const detailView = document.createElement('polaris-mood-detail');
    detailView.mood = mood;
    detailView.moodOptions = this.moodOptions;
    
    // Replace current view with detail view
    this.parentNode.replaceChild(detailView, this);
  }

  toggleSearch() {
    this.isSearchVisible = !this.isSearchVisible;
  }

  render() {
    return html`
      <div class="container">
        <div class="header">
          <div class="icon">
            <!-- Add your SVG icon here -->
          </div>
          <h1>How Do You Feel Right Now?</h1>
        </div>

        ${this.isSearchVisible ? html`
          <div class="search-container">
            <input
              type="text"
              class="search-input"
              placeholder="Search mood..."
              .value=${this.searchQuery}
              @input=${(e) => this.searchQuery = e.target.value}
            >
          </div>
        ` : ''}

        <div class="mood-grid">
          <div
            class="mood-button"
            style="background-color: #FEDDDE; font-weight: 600;"
            @click=${() => this.handleMoodSelect('high-unpleasant')}
          >
            High Energy, Unpleasant
          </div>
          <div
            class="mood-button"
            style="background-color: #FFEFC7;font-weight: 600;"
            @click=${() => this.handleMoodSelect('high-pleasant')}
          >
            High Energy, Pleasant
          </div>
          <div
            class="mood-button"
            style="background-color: #D8E5FF; font-weight: 600;"
            @click=${() => this.handleMoodSelect('low-unpleasant')}
          >
            Low Energy, Unpleasant
          </div>
          <div
            class="mood-button"
            style="background-color: #CFEFE7; font-weight: 600;"
            @click=${() => this.handleMoodSelect('low-pleasant')}
          >
            Low Energy, Pleasant
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define(PolarisMood.tag, PolarisMood); 