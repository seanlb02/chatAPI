import express from 'express';

// import controllers/middleware 
import { getEvents } from '../controllers/events_controllers.js';

const router = express.Router();

    router.get('/all', getEvents)



 // export the router 
 export default router 