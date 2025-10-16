import { getBotResponse } from '../chat-dom/eliza.js';  // adjust path if needed

class SimpleChat extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // 1. Find elements inside this custom element
    this.messagesContainer = this.querySelector('.messages');
    this.form = this.querySelector('form');
    this.input = this.querySelector('input');

    // 2. Add event listener for submit
    this.form.addEventListener('submit', (event) => {
      event.preventDefault();
      const userText = this.input.value.trim();
      if (!userText) return;

      // 3. Add user message
      this.addMessage(userText, 'user');
      this.input.value = '';

      // 4. Get bot reply from Eliza
      const botReply = getBotResponse(userText);

      setTimeout(() => this.addMessage(botReply, 'bot'), 400);
    });

    // 5. Optional: handle Enter key separately
    this.input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        this.form.dispatchEvent(new Event('submit'));
      }
    });
  }

  // 6. Method to create & append messages
  addMessage(text, sender) {
    const message = document.createElement('div');
    message.classList.add('message', sender);
    message.textContent = text;
    this.messagesContainer.appendChild(message);
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
  }
}

// 7. Register the custom element
customElements.define('simple-chat', SimpleChat);
