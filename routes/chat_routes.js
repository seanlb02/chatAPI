import express from 'express';
import { chatData, createChat, getMessages, theirChats, userChats } from '../controllers/chats_controllers.js';
import { authenticateToken, checkVerified } from '../middleware/auth_middleware.js';

import path from 'path'
import {fileURLToPath} from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


const router = express.Router();


    router.post('/create', authenticateToken, createChat)

    router.get('/chatdata/:chatname', authenticateToken, chatData)

router.get('/userchats', authenticateToken, userChats)

router.get('/theirchats/:user', authenticateToken, theirChats)

router.get('/messages/:chatname', authenticateToken, getMessages)

// router.get('/socket.io/', (req, res) => {
//     res.sendFile(__dirname + "/index.html")
// })

 // export the router 
 export default router 