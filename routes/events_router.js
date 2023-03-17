import express from 'express';

// import controllers/middleware 
import { getEvents, postEvent } from '../controllers/events_controllers.js';

const router = express.Router();

    router.get('/all', getEvents)
    router.post('/new', postEvent)

 // export the router 
 export default router 