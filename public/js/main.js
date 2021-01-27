const chatForm = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat-message')

const socket = io()

socket.on('message', message => {
  outputMessage(message)

  chatMessages.scrollTop = chatMessages.scrollHeight
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
  const div = document.createElement('div')
  div.innerHTML = `<div class="message">
						<p class="meta">Brad <span>9:12pm</span></p>
						<p class="text">
							${message}
						</p>
          </div>`
  
  document.querySelector('.chat-messages').appendChild(div)
}