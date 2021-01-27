const chatForm = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat-message')
const roomName = document.getElementById('room-name')
const userList = document.getElementById('users')

const socket = io()

const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
})

socket.emit('joinRoom', { username, room })

socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room)
  outputUsers(users)
})

socket.on('message', message => {
  outputMessage(message)

  // chatMessages.scrollTop = chatMessages.scrollHeight
})

// Message submit
chatForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const msg = e.target.elements.msg.value

  console.log(msg)
  
  socket.emit('chatMessage', msg)
  e.target.elements.msg.value = ''
  e.target.elements.msg.focus()
})

function outputMessage(message) {
  console.log(message)
  const div = document.createElement('div')
  div.innerHTML = `<div class="message">
						<p class="meta">${message.username} <span>${message.time}</span></p>
						<p class="text">
							${message.text}
						</p>
          </div>`
  
  document.querySelector('.chat-messages').appendChild(div)
}

function outputRoomName(room) {
  roomName.innerText = room
}

function outputUsers(users) {
  userList.innerHTML = `
    ${users.map(user => `<li>${user.username}</li>`).join('')}
  `
}