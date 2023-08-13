import express from "express";
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from 'cors'
import http from 'http'

import {Server} from 'socket.io'
import {createServer} from 'http'

// import routes 
import auth_routes from './routes/auth_routes.js' 
import users_routes from './routes/user_routes.js' 
import branches_routes from './routes/branches_routes.js'
import events_routes from './routes/events_router.js'
import chats_routes from './routes/chat_routes.js'
  
const app = express();
const PORT = 8000 
  

import path from 'path'
import {fileURLToPath} from 'url'
import { addMessage } from "./controllers/chats_controllers.js";
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// this middleware will take any json response from an express app route and parse it to a js object
app.use(express.json())

// enable cors
app.use(cors({origin: true}))

// init routes/endpoints with their base url param
app.use('/auth', auth_routes)
app.use('/users', users_routes)
app.use('/branches', branches_routes)
app.use('/events', events_routes)
app.use('/chats', chats_routes)

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.get('/socket.io/', (req, res) => {
    res.sendFile(__dirname + '/node_modules/socket.io/client-dist/socket.io.js');
  });

mongoose.set('strictQuery', true)

// connect mongoose to the database 
mongoose.connect("mongodb+srv://seanchat:Budapest123!@cluster0.cttmem1.mongodb.net/chattree?retryWrites=true&w=majority")
.then((m) => console.log(m.connection.readyState === 1 ? 'Mongoose connected!' : 'Failed to connect'))
.catch((err) => console.log(err))

////////// web socket init ////////////////
// socket io binds to a http server instance which is the express app

const httpServer = createServer(app)

const io = new Server(httpServer, {
    cors:{
        origin:'*'
    }
})

// io.on("connection", (socket) => {
//     console.log('user entered the chat')
//     socket.on('send-message', ({messageEntry, chatname}) => {
        

//         // store incoming data into messages model

//         addMessage(chatname, messageEntry)
     
//         // // emit to all users/onlookers
//         socket.emit('returned-message', messageEntry )
//         socket.to(chatname).emit('returned-message', messageEntry )
        
       
//     });
//     socket.on("disconnect", (socket) => {
//         console.log('user left the chat')
//     });
//     socket.on("join-chat", ({chatname}) => {
//         socket.join(chatname)
//     })
     
// }) 

/////////////////////////////////////////////

httpServer.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);

