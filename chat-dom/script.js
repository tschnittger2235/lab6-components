// Import Eliza response function
import { getBotResponse } from './eliza.js';

// -------------------------
// 1. SELECT DOM ELEMENTS
// -------------------------
const messagesContainer = document.getElementById("messages");
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");

// -------------------------
// 2. HELPER FUNCTION: ADD MESSAGE TO CHAT
// -------------------------
function addMessage(text, sender) {
  const message = document.createElement("div");
  message.classList.add("message", sender);
  message.textContent = text;

  // append to chat window
  messagesContainer.appendChild(message);

  // auto-scroll to bottom
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// -------------------------
// 3. EVENT HANDLER FOR FORM SUBMIT
// -------------------------
chatForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const userText = userInput.value.trim();
  if (userText === "") return;

  // Add user message
  addMessage(userText, "user");

  // Clear input field
  userInput.value = "";

  // Generate bot reply from Eliza
  const botReply = getBotResponse(userText);

  // Slight delay for realism
  setTimeout(() => addMessage(botReply, "bot"), 500);
});

// -------------------------
// 4. ALLOW ENTER KEY TO SEND
// -------------------------
userInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    chatForm.dispatchEvent(new Event("submit"));
  }
});

// Debug confirmation
console.log("script.js loaded and running");
