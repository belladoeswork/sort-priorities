import { LitElement, html, css } from 'lit';

export class PrioritySort extends LitElement {
  static get tag() {
    return 'priority-sort';
  }

  static get properties() {
    return {
      priorities: { type: Array },
      draggedItem: { type: Object },
      customPriority: { type: String }
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
      }

      .priority-item.dragging {
        background: #f5f5f5;
        transform: scale(1.02);
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
    this.draggedItem = this.priorities[index];
    e.currentTarget.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index);
  }

  handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }

  handleDrop(e, dropIndex) {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));
    
    if (dragIndex === dropIndex) return;

    // Remove dragged item from array
    const newPriorities = [...this.priorities];
    const [removed] = newPriorities.splice(dragIndex, 1);
    
    // Insert at new position
    newPriorities.splice(dropIndex, 0, removed);
    
    this.priorities = newPriorities;
    this.requestUpdate();
  }

  handleDragEnd(e) {
    e.currentTarget.classList.remove('dragging');
    this.draggedItem = null;
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
                draggable="true"
                @dragstart="${(e) => this.handleDragStart(e, index)}"
                @dragover="${this.handleDragOver}"
                @drop="${(e) => this.handleDrop(e, index)}"
                @dragend="${this.handleDragEnd}"
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