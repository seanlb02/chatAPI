import express from 'express';
import { getChats, postBranch } from '../controllers/branches_controllers.js';
import { authenticateToken, checkVerified } from '../middleware/auth_middleware.js';


const router = express.Router();


    router.post('/send', authenticateToken, checkVerified, postBranch)

    router.get('/chats', authenticateToken, getChats)

    router.get('/userchats', authenticateToken, )
// integrate this route with socket.io
    router.get('/chat/:chatname', authenticateToken)

 // export the router 
 export default router 