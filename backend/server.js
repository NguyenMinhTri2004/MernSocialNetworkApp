require('dotenv').config()

const express = require('express')

const mongoose = require('mongoose')

const cors = require('cors')

const cookieParser = require('cookie-parser')

const SocketServer = require('./SocketSever')

const { ExpressPeerServer } = require('peer')

const app = express()

app.use(express.json())

app.use(cors())

app.use(cookieParser())




const URLDB = process.env.MONGODB

// Routes

app.use('/api', require('./routes/authRouter'))

app.use('/api', require('./routes/userRouter'))

app.use('/api', require('./routes/postRouter'))

app.use('/api', require('./routes/commentRouter'))

app.use('/api', require('./routes/notifyRouter'))

app.use('/api', require('./routes/messageRouter'))



// Socket

const http = require('http').createServer(app)
const io = require('socket.io')(http)



io.on('connection', (socket) => {
    SocketServer(socket)
})


ExpressPeerServer(http, { path: '/' })

mongoose.connect(URLDB , {
    useCreateIndex : true,
    useFindAndModify : false,
    useNewUrlParser : true,
    useUnifiedTopology : true

   

} , error => {
    if(error) {
        console.log(error)
    }
})


const port = process.env.PORT || 5000

http.listen(port, () => {
    console.log("Dang chay tren" , port)
})





