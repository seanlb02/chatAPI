import express from 'express';
import { postBranch } from '../controllers/branches_controllers.js';
import { authenticateToken, checkVerified } from '../middleware/auth_middleware.js';


const router = express.Router();


    router.post('/send', authenticateToken, checkVerified, postBranch)

    router.get('/all', authenticateToken, checkVerified, )


 // export the router 
 export default router 