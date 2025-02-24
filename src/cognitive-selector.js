import { LitElement, html, css } from 'lit';

export class CognitiveSelector extends LitElement {
  static get tag() {
    return 'cognitive-selector';
  }

  static get properties() {
    return {
      selectedMood: { type: String },
      searchQuery: { type: String },
      isSearchVisible: { type: Boolean },
      moodOptions: { type: Object },
      thoughtPairs: { type: Array },
      currentPair: { type: Object },
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
        { text: "Frustrated", color: "#FEDDDE", intensity: 100 },
        { text: "Tense", color: "#FEDDDE", intensity: 100 },
        { text: "Stressed", color: "#FEDDDE", intensity: 100 },
        { text: "Annoyed", color: "#FEDDDE", intensity: 100 },
        { text: "Nervous", color: "#FEDDDE", intensity: 100 },
        // { text: "Irritated", color: "#FEDDDE", intensity: 100 },
        // { text: "Agitated", color: "#FEDDDE", intensity: 100 },
        // { text: "Enraged", color: "#FEDDDE", intensity: 100 },
        // { text: "Anxious", color: "#FEDDDE", intensity: 100 },
        // { text: "Upset", color: "#FEDDDE", intensity: 100 },
        // { text: "Distressed", color: "#FEDDDE", intensity: 100 },
        // { text: "Furious", color: "#FEDDDE", intensity: 100 },
        // { text: "Outraged", color: "#FEDDDE", intensity: 100},
        // { text: "Hostile", color: "#FEDDDE", intensity: 100 },
        // { text: "Terrified", color: "#FEDDDE", intensity: 100 },
        // { text: "Panicked", color: "#FEDDDE", intensity: 100 },
        // { text: "Shocked", color: "#FEDDDE", intensity: 100 },
        // { text: "Impassioned", color: "#FEDDDE", intensity: 100 },
        // { text: "Hyper", color: "#FEDDDE", intensity: 100 },
        // { text: "Livid", color: "#FEDDDE", intensity: 100 },
        // { text: "Irate", color: "#FEDDDE", intensity: 100 },
        // { text: "Overwhelmed", color: "#FEDDDE", intensity: 100 },
        // { text: "Pressured", color: "#FEDDDE", intensity: 100 },
        // { text: "Restless", color: "#FEDDDE", intensity: 100 },
        // { text: "Frightened", color: "#FEDDDE", intensity: 100 },
        // { text: "Apprehensive", color: "#FEDDDE", intensity: 100 },
        // { text: "Fomo", color: "#FEDDDE", intensity: 100 },
        // { text: "Confused", color: "#FEDDDE", intensity: 100 },
        // { text: "Jealous", color: "#FEDDDE", intensity: 100 },
        // { text: "Scared", color: "#FEDDDE", intensity: 100 },
        // { text: "Jittery", color: "#FEDDDE", intensity: 100 },
        // { text: "Concerned", color: "#FEDDDE", intensity: 100 },
        // { text: "Envious", color: "#FEDDDE", intensity: 100 },
        // { text: "Repulsed", color: "#FEDDDE", intensity: 100 },
        // { text: "Embarrassed", color: "#FEDDDE", intensity: 100 },
        // { text: "Peeved", color: "#FEDDDE", intensity: 100 },
        // { text: "Uneasy", color: "#FEDDDE", intensity: 100 },
        // { text: "Contempt", color: "#FEDDDE", intensity: 100 },
        // { text: "Troubled", color: "#FEDDDE", intensity: 30 },
        // { text: "Worried", color: "#FEDDDE", intensity: 30 },
      ],
      "high-pleasant": [
        { text: "Excited", color: "#FFEFC7", intensity: 100 },
        { text: "Energetic", color: "#FFEFC7", intensity: 100 },
        { text: "Happy", color: "#FFEFC7", intensity: 100 },
        { text: "Joyful", color: "#FFEFC7", intensity: 100 },
        { text: "Motivated", color: "#FFEFC7", intensity: 100 },
        { text: "Inspired", color: "#FFEFC7", intensity: 100 },
        // { text: "Enthusiastic", color: "#FFEFC7", intensity: 100 },
        // { text: "Cheerful", color: "#FFEFC7", intensity: 100 },
        // { text: "Delighted", color: "#FFEFC7", intensity: 100 },
        // { text: "Thrilled", color: "#FFEFC7", intensity: 100 },
        // { text: "Elated", color: "#FFEFC7", intensity: 100 },
        // { text: "Upbeat", color: "#FFEFC7", intensity: 100 },
        // { text: "Jubilant", color: "#FFEFC7", intensity: 100 },
        // { text: "Ecstatic", color: "#FFEFC7", intensity: 100 },
        // { text: "Radiant", color: "#FFEFC7", intensity: 100 },
        //   { text: "Surprised", color: "#FFEFC7", intensity: 100 },
        //   { text: "Awe", color: "#FFEFC7", intensity: 100 },
        //   { text: "Exhilarated", color: "#FFEFC7", intensity: 100 },
        //   { text: "Determined", color: "#FFEFC7", intensity: 100 },
        //   { text: "Successful", color: "#FFEFC7", intensity: 100 },
        //   { text: "Amazed", color: "#FFEFC7", intensity: 100 },
        //   { text: "Empowered", color: "#FFEFC7", intensity: 100 },
        //   { text: "Energized", color: "#FFEFC7", intensity: 100},
        //   { text: "Eager", color: "#FFEFC7", intensity: 100},
        //   { text: "Productive", color: "#FFEFC7", intensity: 100},
        //   { text: "Proud", color: "#FFEFC7", intensity: 100},
        //   { text: "Curious", color: "#FFEFC7", intensity: 100 },
        //   { text: "Optimistic", color: "#FFEFC7", intensity: 100},
        //   { text: "Pleasant", color: "#FFEFC7", intensity: 100},
        //   { text: "Focused", color: "#FFEFC7", intensity: 100},
        //   { text: "Alive", color: "#FFEFC7", intensity: 100},
        //   { text: "Confident", color: "#FFEFC7", intensity: 100},
        //   { text: "Engaged", color: "#FFEFC7", intensity: 100},
        //   { text: "Challenged", color: "#FFEFC7", intensity: 100},
        //   { text: "Accomplished", color: "#FFEFC7", intensity: 100},
        //   { text: "Pleased", color: "#FFEFC7", intensity: 100},
        //   { text: "Playful", color: "#FFEFC7", intensity: 100},
        //   { text: "Wishful", color: "#FFEFC7", intensity: 100},
        //   { text: "Hopeful", color: "#FFEFC7", intensity: 100},
      ],
      "low-unpleasant": [
    { text: "Sad", color: "#D8E5FF", intensity: 100 },
    { text: "Tired", color: "#D8E5FF", intensity: 100 },
    { text: "Bored", color: "#D8E5FF", intensity: 100 },
    { text: "Lonely", color: "#D8E5FF", intensity: 100 },
    { text: "Melancholic", color: "#D8E5FF", intensity: 100 },
    { text: "Exhausted", color: "#D8E5FF", intensity: 100 },
    // { text: "Dismal", color: "#D8E5FF", intensity: 100 },
    // { text: "Drained", color: "#D8E5FF", intensity: 100 },
    // { text: "Gloomy", color: "#D8E5FF", intensity: 100 },
    // { text: "Down", color: "#D8E5FF", intensity: 100 },
    // { text: "Weary", color: "#D8E5FF", intensity: 100 },
    // { text: "Dejected", color: "#D8E5FF", intensity: 100 },
    // { text: "Hopeless", color: "#D8E5FF", intensity: 100 },
    // { text: "Despondent", color: "#D8E5FF", intensity: 100 },
    // { text: "Miserable", color: "#D8E5FF", intensity: 100 },
    //   { text: "Trapped", color: "#D8E5FF", intensity: 100 },
    //   { text: "Disgusted", color: "#D8E5FF", intensity: 100 },
    //   { text: "Ashamed", color: "#D8E5FF", intensity: 100 },
    //   { text: "Insecure", color: "#D8E5FF", intensity: 100 },
    //   { text: "Disheartened", color: "#D8E5FF", intensity: 100 },
    //   { text: "Humiliated", color: "#D8E5FF", intensity: 100 },
    //   { text: "Vulnerable", color: "#D8E5FF", intensity: 100 },
    //   { text: "Disappointed", color: "#D8E5FF", intensity: 100 },
    //   { text: "Meh", color: "#D8E5FF", intensity: 100 },
    //   { text: "Pessimistic", color: "#D8E5FF", intensity: 100 },
    //   { text: "Numb", color: "#D8E5FF", intensity: 100 },
    //   { text: "Forlorn", color: "#D8E5FF", intensity: 100 },
    //   { text: "Fatigued", color: "#D8E5FF", intensity: 100 },
    //   { text: "Guilty", color: "#D8E5FF", intensity: 100 },
    //   { text: "Depressed", color: "#D8E5FF", intensity: 100 },
    //   { text: "Spent", color: "#D8E5FF", intensity: 100 },
    //   { text: "Discouraged", color: "#D8E5FF", intensity: 100 },
    //   { text: "Disengaged", color: "#D8E5FF", intensity: 100 },
    //   { text: "Despair", color: "#D8E5FF", intensity: 100},
    //   { text: "Alienated", color: "#D8E5FF", intensity: 100},
    //   { text: "Nostalgic", color: "#D8E5FF", intensity: 100},
    //   { text: "Apathetic", color: "#D8E5FF", intensity: 100},
    //   { text: "Excluded", color: "#D8E5FF", intensity: 100},
    //   { text: "Disconnected", color: "#D8E5FF", intensity: 100},
      // { text: "Glum", color: "#D8E5FF", intensity: 30},
      // { text: "Burned Out", color: "#D8E5FF", intensity: 30},
      // { text: "Helpless", color: "#D8E5FF", intensity: 30},
  ],
  "low-pleasant": [
    { text: "Calm", color: "#CFEFE7", intensity: 100 },
    { text: "Relaxed", color: "#CFEFE7", intensity: 100 },
    { text: "Peaceful", color: "#CFEFE7", intensity: 100 },
    { text: "Content", color: "#CFEFE7", intensity: 100 },
    { text: "Serene", color: "#CFEFE7", intensity: 100 },
    { text: "Tranquil", color: "#CFEFE7", intensity: 100 },
    // { text: "At ease", color: "#CFEFE7", intensity: 100 },
    // { text: "Mellow", color: "#CFEFE7", intensity: 100 },
    // { text: "Composed", color: "#CFEFE7", intensity: 100 },
    // { text: "Gentle", color: "#CFEFE7", intensity: 100 },
    // { text: "Soothed", color: "#CFEFE7", intensity: 100 },
    // { text: "Placid", color: "#CFEFE7", intensity: 100 },
    // { text: "Restful", color: "#CFEFE7", intensity: 100 },
    // { text: "Harmonious", color: "#CFEFE7", intensity: 100 },
    // { text: "Balanced", color: "#CFEFE7", intensity: 100 },
    //   { text: "Thoughtful", color: "#CFEFE7", intensity: 100 },
    //   { text: "Appreciated", color: "#CFEFE7", intensity: 100 },
    //   { text: "Understood", color: "#CFEFE7", intensity: 100},
    //   { text: "Respected", color: "#CFEFE7", intensity: 100},
    //   { text: "Fulfilled", color: "#CFEFE7", intensity: 100 },
    //   { text: "Blissful", color: "#CFEFE7", intensity: 100 },
    //   { text: "Chill", color: "#CFEFE7", intensity: 100},
    //   { text: "Comfortable", color: "#CFEFE7", intensity: 100},
    //  { text: "Compassionate", color: "#CFEFE7", intensity: 100},
      // { text: "Supported", color: "#CFEFE7", intensity:100},
      // { text: "Loved", color: "#CFEFE7", intensity:100},
      // { text: "Connected", color: "#CFEFE7", intensity: 100},
      // { text: "Sympathetic", color: "#CFEFE7", intensity: 100},
      // { text: "Empathetic", color: "#CFEFE7", intensity: 100},
      // { text: "Valued", color: "#CFEFE7", intensity: 100},
      // { text: "Grateful", color: "#CFEFE7", intensity: 100},
      // { text: "Thankful", color: "#CFEFE7", intensity: 100},
      // { text: "Accepted", color: "#CFEFE7", intensity: 100},
      // { text: "Moved", color: "#CFEFE7", intensity: 100},
      // { text: "Carefree", color: "#CFEFE7", intensity: 100},
      // { text: "Safe", color: "#CFEFE7", intensity: 100},
      // { text: "Secure", color: "#CFEFE7", intensity: 100},
      // { text: "Blessed", color: "#CFEFE7", intensity: 100},
      // { text: "Relieved", color: "#CFEFE7", intensity: 100},
      // { text: "Satisfied", color: "#CFEFE7", intensity: 100},
    ],
    };
    
    // Add the thought pairs
    this.thoughtPairs = [
      { negative: "Everybody hates me", balanced: "Some people like me" },
      { negative: "I will definitely fail the exam", balanced: "I can prepare and try" },
      { negative: "My success was just luck", balanced: "I worked hard" },
      { negative: "I feel like nobody likes me, so it must be true", balanced: "Feelings aren't facts" },
      { negative: "I am a failure", balanced: "I can improve" },
      { negative: "I got one bad review, so I am terrible at my job", balanced: "I got positive feedback too" },
      { negative: "They think I'm stupid", balanced: "I can ask them" },
      { negative: "They were upset, it must be my fault", balanced: "It might not be about me" },
      { negative: "I must never make mistakes", balanced: "Mistakes help learning" },
      { negative: "I failed once, so I will always fail", balanced: "I can try again" },
      { negative: "She didn't smile at me, she must hate me", balanced: "She might be busy" }
    ];
    
    // Select a random pair when component is constructed
    this.currentPair = this.thoughtPairs[Math.floor(Math.random() * this.thoughtPairs.length)];
  }

  static get styles() {
    return css`
      :host {
        display: block;
        font-family: sans-serif;
      }

      .container {
        background: white;
        min-height: 100vh;
        padding: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
      }

      .header {
        text-align: center;
        
        margin-top: 130px;
      }

      h1 {
        font-size: 24px;
        color: #333;
        margin: 0;
      }

      .options-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
        width: 100%;
        max-width: 600px;
        padding: 0 20px;
        margin-top: 10vh;
      }

      .option-button {
        min-height: 120px;
        height: auto;
        border: 1px solid #000;
        border-radius: 8px;
        background: white;
        font-size: 14px;
        cursor: pointer;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 16px;
        line-height: 1.3;
        word-wrap: break-word;
        white-space: normal;
        overflow-wrap: break-word;
      }

      .option-button.full-width {
        grid-column: 1 / -1;
        min-height: 60px;
        height: auto;
      }

      .option-button:hover {
        background: #f5f5f5;
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
    
    // Update URL to reflect the selected mood (changed from /mood/${mood})
    window.history.pushState({}, '', `/${mood}`);
    
    // Show the detail view
    const detailView = document.createElement('cognitive-selector-detail');
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
          <h1>How are you more likely to think?</h1>
        </div>

        <div class="options-container">
          <button 
            class="option-button"
            @click=${() => this.handleMoodSelect('negative-thought')}
          >
            ${this.currentPair.negative}
          </button>

          <button
            class="option-button"
            @click=${() => this.handleMoodSelect('balanced-thought')}
          >
            ${this.currentPair.balanced}
          </button>

          <button
            class="option-button full-width"
            @click=${() => this.handleMoodSelect('none')}
          >
            None of the above
          </button>
        </div>
      </div>
    `;
  }
}

customElements.define(CognitiveSelector.tag, CognitiveSelector); 