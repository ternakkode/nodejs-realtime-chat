const path = require('path')
const http = require('http')
const express = require('express')
const socketIo = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketIo(server)

app.use(express.static(path.join(__dirname, 'public')))

io.on('connection', socket => {
    console.log("New websocket connection..");
    socket.emit('message', 'Welcome to Chat App')

    socket.broadcast.emit()

    io.emit()
})

const PORT = 3000 || process.env.PORT

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))