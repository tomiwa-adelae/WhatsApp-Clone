// Chat Class
class Chat {
   constructor(chatName, chatNumber) {
      this.chatName = chatName;
      this.chatNumber = chatNumber;
   }
}

// Message Class
class Message {
   constructor(messageOne) {
      this.messageOne = messageOne;
   }
}

// UI Class
class UI {
   static getChats() {
      const chats = Storage.getChatsFromStorage();

      // Loop Through all of it
      chats.forEach((chat) => UI.addChat(chat));
   }

   static addChat(chat) {
      // Create a new Div
      const newDiv = document.createElement('div');
      newDiv.classList.add('chat');
      newDiv.innerHTML = `
         <div class="chat-head">
            <img class = "rounded-img" src ="img/portrait-1.jpg">
            <h4>${chat.chatName}</h4>
            <p>${chat.chatNumber}</p>
         </div>
         <div class="time-badge mx-1">
            <span class ="time">10:04 PM</span>
            <div class ="message-count">
               <span class="badge badge-success">10</span>
               <i class="fas fa-chevron-down"></i>
            </div>
            
         </div>
      `;
      // Append the New Div to the Chats Section
      const chatsList = document.querySelector('.chats-section');
      chatsList.appendChild(newDiv);
   }

   // Show Alert
   static showAlert(message, className) {
      // Create an Alert Div
      const alertDiv = document.createElement('div');
      alertDiv.className = `alert alert-${className}`;
      alertDiv.appendChild(document.createTextNode(message));
      // Get Location to Insert it
      const addChatSection = document.querySelector('.add-chat-form-section');
      const addChatForm = document.querySelector('#add-chat-form');
      addChatSection.insertBefore(alertDiv, addChatForm);

      setTimeout(() => document.querySelector('.alert').remove(), 3000);
   }

   static searchChat(el) {
      // Get what is being typed
      const searchText = el.value.toLowerCase();

      // Grab all the chat in the HTML
      const chatLists = document.querySelectorAll('.chats-section div.chat');

      // Convert to an Array
      Array.from(chatLists).forEach((chatList) => {
         const chatName = chatList.firstElementChild.textContent;

         // Now Compare
         if (chatName.toLowerCase().indexOf(searchText) != -1) {
            chatList.style.display = 'flex';
         } else {
            chatList.style.display = 'none';
         }
      });
   }

   static openChats(el) {
      const chatLists = document.querySelectorAll('.chats-section div.chat');

      // Convert to an Array
      Array.from(chatLists).forEach((chatList) => {
         const chatName = chatList.firstElementChild.textContent;
         chatList.addEventListener('click', (e) => {
            // Make the WhatsApp Intro Displayed None
            document.querySelector('.whatsapp-intro').style.display = 'none';
            const chatName = e.target.children[0].innerText;
            const messageChat = document.createElement('div');
            messageChat.classList.add('show-messages-chats');
            messageChat.innerHTML = `
               <div class="chat">
                  <div class ="chat-header">
                     <div class ="profile-img px-1">
                        <img class = "rounded-img" src ="img/portrait-4.jpg">
                        <h4 class= "message-name">${chatName}</h4>
                     </div>
                     <div class ="chat-header-utilities">
                        <div class ="px-2">
                           <i class ="fas fa-search"></i>
                        </div>
                        <div class="burger px-2">
                           <div class="line-1"></div>
                           <div class="line-2"></div>
                           <div class="line-3"></div>
                        </div>
                     </div>
                  </div>

                  <div class ="chat-message">
                     <div>Tomiwa<div>
                  </div>

                  <form class ="chat-input">
                     <div>
                        <i class="fas fa-smile"></i>
                        <i class="fas fa-paperclip"></i>
                     </div>
                     <input
                        type="text"
                        class="input"
                        placeholder="Type a message"
                     />
                     <div>
                        <button>
                           <img src="img/Capture.PNG" alt="" />
                        </button>
                     </div>
                  </form>
               </div>
            `;
            // Append Message Div to the HTML
            const messageList = document.querySelector('.messages-section');
            messageList.classList.add('show-messages-section');
            messageList.appendChild(messageChat);

            // Grab the Form Value
            document
               .querySelector('.chat-input')
               .addEventListener('submit', (e) => {
                  e.preventDefault();
                  // Grab the input text
                  const chatText = document.querySelector('.input').value;
                  if (chatText.length === 0) {
                     return;
                  } else {
                     const messageOne = new Message(chatText);

                     // Create a new Div
                     const newDiv = document.createElement('div');
                     newDiv.classList.add('message-div');
                     newDiv.innerHTML = `
                        ${chatText}
                     `;

                     console.log(newDiv);

                     // Insert it to the HTML
                     const chatMessages = document.querySelector(
                        '.chat-message'
                     );
                     chatMessages.appendChild(newDiv);

                     // Clear Fields
                     document.querySelector('.input').value = '';
                  }
               });
         });
      });
   }

   // Display Time
   static displayTime() {
      // Display Current Time
      const times = document.querySelector('.time');
      const showAmPm = true;

      function displayTime() {
         let currentTime = new Date(),
            currentHour = currentTime.getHours(),
            currentMins = currentTime.getMinutes(),
            currentSec = currentTime.getSeconds();

         const amPm = currentHour >= 12 ? 'PM' : 'AM';

         // For 12 Hours Format
         currentHour = currentHour % 12 || 12;

         times.innerHTML = `
         ${currentHour}<span>:</span>${addZeros(
            currentMins
         )}<span>:</span>${addZeros(currentSec)} ${showAmPm ? amPm : ''}
      `;

         setTimeout(displayTime, 1000);
      }

      // Add Zeros
      function addZeros(n) {
         return (parseInt(n, 10) < 10 ? '0' : '') + n;
      }

      displayTime();
   }

   static clearFields() {
      const nameInput = (document.querySelector('.name-input').value = '');
      const numberInput = (document.querySelector('.number-input').value = '');
   }
}

// Storage Class
class Storage {
   static getChatsFromStorage(chat) {
      let chats;
      if (localStorage.getItem('chat') === null) {
         chats = [];
      } else {
         chats = JSON.parse(localStorage.getItem('chat'));
      }

      return chats;
   }

   static addChatsFromStorage(chat) {
      let chats;
      if (localStorage.getItem('chat') === null) {
         chats = [];
      } else {
         chats = JSON.parse(localStorage.getItem('chat'));
      }

      chats.push(chat);
      localStorage.setItem('chat', JSON.stringify(chats));
   }
}

// Bring the Add Chat Form
document.querySelector('.create-chat').addEventListener('click', (e) => {
   const createChatForm = document.querySelector('#add-chat-form');
   createChatForm.classList.toggle('show-add-form');
});

// Display Chat
document.addEventListener('DOMContentLoaded', UI.getChats);

// Display Time
document.addEventListener('DOMContentLoaded', UI.displayTime);

// Add Chat
document.querySelector('#add-chat-form').addEventListener('submit', (e) => {
   e.preventDefault();
   const nameInput = document.querySelector('.name-input').value;
   const numberInput = document.querySelector('.number-input').value;

   if (nameInput === '' || numberInput === '') {
      UI.showAlert(`Please Enter All Fields`, 'danger');
   } else {
      // Instatiate a new Chat
      const chat = new Chat(nameInput, numberInput);

      UI.addChat(chat);

      Storage.addChatsFromStorage(chat);

      UI.openChats(e.target);

      // Clear All Fields
      UI.clearFields();

      // Toggle back the class of form
      const createChatForm = document.querySelector('#add-chat-form');
      createChatForm.classList.toggle('show-add-form');
   }
});

// Search Chat
document
   .querySelector('.search-section input')
   .addEventListener('keyup', (e) => {
      UI.searchChat(e.target);
   });

// Create Message Chat
document.addEventListener('DOMContentLoaded', (e) => {
   UI.openChats(e.target);
});

// Remove Chat
