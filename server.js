const path = require('path')
const http = require('http')
const express = require('express')
const socketIo = require('socket.io')
const formatMessage = require('./utils/messages')
const {userJoin, userLeave, getCurrentUser, getRoomUsers} = require('./utils/users')

const app = express()
const server = http.createServer(app)
const io = socketIo(server)

const botName = 'Admin'

app.use(express.static(path.join(__dirname, 'public')))

io.on('connection', socket => {
    socket.on('joinRoom', ({ username, room }) => {
        const user = userJoin(socket.id, username, room)

        socket.join(user.room)

        socket.broadcast
            .to(user.room)
            .emit('message', formatMessage(botName, `${user.username} has joined the chat`))
    })

    socket.emit('message', formatMessage(botName, 'Welcome to Chat App'))

    socket.on('disconnect', () => {
        const user = userLeave(socket.id)
        console.log(user)

        if (user) {
            io
                .to(user.room)
                .emit('message', formatMessage(botName, `${user.username} has left the chat`))
        }
        
    })

    socket.on('chatMessage', msg => {
        const user = getCurrentUser(socket.id) 
        
        io
            .to(user.room)
            .emit('message', formatMessage(user.username, msg))
    })
})

const PORT = 3000 || process.env.PORT

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))