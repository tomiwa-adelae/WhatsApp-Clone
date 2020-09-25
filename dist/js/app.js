// Chat Class
class Chat {
   constructor(chatName, chatNumber) {
      this.chatName = chatName;
      this.chatNumber = chatNumber;
   }
}

// Message Class
class Message {
   constructor(messageOne, messageTwo) {
      this.messageOne = messageOne;
      this.messageTwo = messageTwo;
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
         </div>
         <div class="time-badge mx-1">
            <span>10:04 PM</span>
            <span class="badge badge-success">10</span>
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

         // NOW WE WANNA COMPARE TO SEE IF ANYTGING WE TYPE I THE SEARCH INPUT IS EQUAL TO THE LIST
         // if (itemName.toLowerCase().indexOf(searchText) != -1) {
         //    item.style.display = 'block';
         // } else {
         //    item.style.display = 'none';
         // }
      });
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

// Remove Chat
