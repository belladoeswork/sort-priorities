import { LitElement, html, css } from 'lit';

export class PrioritySort extends LitElement {
  static get tag() {
    return 'priority-sort';
  }

  static get properties() {
    return {
      priorities: { type: Array },
      draggedItem: { type: Object },
      customPriority: { type: String },
      isDragging: { type: Boolean },
      dragStartY: { type: Number },
      dragStartIndex: { type: Number },
      currentY: { type: Number }
    };
  }

  constructor() {
    super();
    this.priorities = [
      { id: 1, text: 'Health and fitness' },
      { id: 2, text: 'Family' },
      { id: 3, text: 'Romantic relationships' },
      { id: 4, text: 'Financial security' },
      { id: 5, text: 'Personal safety and security' },
      { id: 6, text: 'Travel and exploration' },
      { id: 7, text: 'Spirituality and faith' },
      { id: 8, text: 'Education' },
      { id: 9, text: 'Community' },
    ];
    this.shufflePriorities();
    this.draggedItem = null;
    this.customPriority = '';
    this.isDragging = false;
    this.dragStartY = 0;
    this.dragStartIndex = -1;
    this.currentY = 0;
  }

  shufflePriorities() {
    for (let i = this.priorities.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.priorities[i], this.priorities[j]] = [this.priorities[j], this.priorities[i]];
    }
  }

  static get styles() {
    return css`
      :host {
        display: block;
        padding: 20px;
        font-family: sans-serif;
      }

      .container {
        max-width: 600px;
        margin: 0 auto;
      }

      h2 {
        text-align: center;
        color: #333;
        font-size: 24px;
        margin-bottom: 30px;
      }

      .priority-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      .priority-item {
        display: flex;
        align-items: center;
        padding: 15px;
        margin: 8px 0;
        background: white;
        border: 1px solid #2F3336;
        border-radius: 8px;
        cursor: move;
        user-select: none;
        transition: background-color 0.2s, transform 0.2s;
        touch-action: none;
        position: relative;
      }

      .priority-item.dragging {
        z-index: 1000;
        cursor: grabbing;
        opacity: 0.9;
        transform: scale(1.02);
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
      }

      .priority-number {
        margin-right: 15px;
        font-weight: bold;
        color: #666;
        width: 20px;
      }

      .custom-priority {
        display: flex;
        align-items: center;
        margin-top: 20px;
        position: relative;
      }

      .custom-priority input {
        width: 100%;
        padding: 15px;
        padding-right: 40px; /* Make room for the pencil icon */
        border: 1px solid #ddd;
        border-radius: 8px;
        font-size: 16px;
      }

      .edit-icon {
        position: absolute;
        right: 15px;
        color: #666;
        pointer-events: none; /* Makes the icon not interfere with input */
      }
    `;
  }

  handleDragStart(e, index) {
    e.preventDefault();
    
    const touch = e.touches ? e.touches[0] : e;
    this.isDragging = true;
    this.dragStartY = touch.clientY;
    this.currentY = touch.clientY;
    this.dragStartIndex = index;
    
    const element = e.currentTarget;
    element.classList.add('dragging');
    
    const rect = element.getBoundingClientRect();
    element.style.transform = `translateY(0)`;
  }

  handleDragMove(e) {
    if (!this.isDragging) return;
    e.preventDefault();
    
    const touch = e.touches ? e.touches[0] : e;
    this.currentY = touch.clientY;
    
    const deltaY = this.currentY - this.dragStartY;
    const element = this.shadowRoot.querySelector('.dragging');
    if (!element) return;
    
    element.style.transform = `translateY(${deltaY}px)`;
    
    const items = [...this.shadowRoot.querySelectorAll('.priority-item')];
    const draggingRect = element.getBoundingClientRect();
    const middleY = draggingRect.top + draggingRect.height / 2;
    
    // Find the closest item by comparing with all items at once
    let newIndex = this.dragStartIndex;
    let minDistance = Infinity;
    
    items.forEach((item, index) => {
      if (item.classList.contains('dragging')) return;
      
      const rect = item.getBoundingClientRect();
      const itemMiddleY = rect.top + rect.height / 2;
      const distance = Math.abs(middleY - itemMiddleY);
      
      // If this is the closest item we've found so far
      if (distance < minDistance) {
        minDistance = distance;
        newIndex = index;
      }
    });

    if (newIndex !== this.dragStartIndex) {
      this.reorderItems(this.dragStartIndex, newIndex);
      this.dragStartIndex = newIndex;
    }
  }

  handleDragEnd(e) {
    if (!this.isDragging) return;
    e.preventDefault();
    
    this.isDragging = false;
    const element = this.shadowRoot.querySelector('.dragging');
    if (element) {
      element.style.transform = '';
      element.classList.remove('dragging');
    }
  }

  reorderItems(fromIndex, toIndex) {
    const newPriorities = [...this.priorities];
    const [removed] = newPriorities.splice(fromIndex, 1);
    newPriorities.splice(toIndex, 0, removed);
    this.priorities = newPriorities;
  }

  addCustomPriority(e) {
    if (e.key === 'Enter' && this.customPriority.trim()) {
      this.priorities = [
        ...this.priorities,
        {
          id: this.priorities.length + 1,
          text: this.customPriority.trim()
        }
      ];
      this.customPriority = '';
    }
  }

  render() {
    return html`
      <div class="container">
        <h2>Sort your priorities in life at the moment?</h2>
        
        <ul class="priority-list">
          ${this.priorities.map((priority, index) => html`
            <li class="priority-item"
                @mousedown="${(e) => this.handleDragStart(e, index)}"
                @touchstart="${(e) => this.handleDragStart(e, index)}"
                @mousemove="${this.handleDragMove}"
                @touchmove="${this.handleDragMove}"
                @mouseup="${this.handleDragEnd}"
                @touchend="${this.handleDragEnd}"
                @mouseleave="${this.handleDragEnd}"
            >
              <span class="priority-number">${index + 1}</span>
              ${priority.text}
            </li>
          `)}
        </ul>

        <div class="custom-priority">
          <input 
            type="text"
            placeholder="Write your own one"
            .value="${this.customPriority}"
            @input="${(e) => this.customPriority = e.target.value}"
            @keyup="${this.addCustomPriority}"
          >
          <span class="edit-icon">✎</span>
        </div>
      </div>
    `;
  }
}

customElements.define(PrioritySort.tag, PrioritySort); 