
import express from 'express';

import  UsersModel  from "../models/Users_model.js"

import bcrypt from "bcryptjs"
const saltRounds = 10
import jwt from "jsonwebtoken"

// import controllers/middleware 
import { registerUser, handleLogin } from '../middleware/auth_middleware.js';

const router = express.Router();

// ROUTES //
    
        // route to create a new 'user' document   
        router.post('/register', registerUser)

        //  route to log a user in (give them a token)
        router.post('/login', handleLogin)



 // export the router 
export default router 