import { getBotResponse } from '../chat-dom/eliza.js'; // adjust path if needed

class ChatInterface extends HTMLElement {
  constructor() {
    super();
    // Attach Shadow DOM
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    // Create inner HTML for the Shadow DOM
    this.shadowRoot.innerHTML = `
      <style>
        * {
          box-sizing: border-box;
        }

        .chat-container {
          font-family: Arial, sans-serif;
          width: 400px;
          background: white;
          border-radius: 10px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.15);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        header {
          background: #6b5cf3;
          color: white;
          text-align: center;
          padding: 10px;
          font-weight: bold;
        }

        .messages {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 10px;
          overflow-y: auto;
          height: 300px;
        }

        .message {
          margin: 6px 0;
          padding: 8px 12px;
          border-radius: 10px;
          max-width: 70%;
          line-height: 1.4;
          word-wrap: break-word;
        }

        .bot {
          background: #d7f8d7;
          align-self: flex-start;
        }

        .user {
          background: #cfe3ff;
          align-self: flex-end;
        }

        form {
          display: flex;
          gap: 8px;
          border-top: 1px solid #ddd;
          padding: 10px;
          background: #f9f9f9;
        }

        input {
          flex: 1;
          padding: 8px;
          border-radius: 6px;
          border: 1px solid #ccc;
        }

        button {
          background: #6b5cf3;
          color: white;
          border: none;
          border-radius: 6px;
          padding: 8px 14px;
          cursor: pointer;
        }

        button:hover {
          background: #5948e2;
        }
      </style>

      <div class="chat-container">
        <header>Surf Chat Bot (Shadow DOM)</header>
        <div class="messages">
          <div class="message bot">Hello! How can I help you?</div>
        </div>
        <form>
          <input type="text" placeholder="Type a message..." />
          <button type="submit">Send</button>
        </form>
      </div>
    `;

    // Select elements inside the shadow DOM
    this.messages = this.shadowRoot.querySelector('.messages');
    this.form = this.shadowRoot.querySelector('form');
    this.input = this.shadowRoot.querySelector('input');

    // Add event listeners
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      const userText = this.input.value.trim();
      if (!userText) return;

      this.addMessage(userText, true);
      this.input.value = '';

      const botReply = getBotResponse(userText);
      setTimeout(() => this.addMessage(botReply, false), 500);
    });
  }

  addMessage(text, isUser) {
    const msg = document.createElement('div');
    msg.classList.add('message', isUser ? 'user' : 'bot');
    msg.textContent = text;
    this.messages.appendChild(msg);
    this.messages.scrollTop = this.messages.scrollHeight;
  }
}

// Register the element
customElements.define('chat-interface', ChatInterface);
