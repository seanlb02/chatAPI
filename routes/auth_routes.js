
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
        router.post('/register', (req, res) => { 
                const { email, user, pwd, age, is_verified} = req.body;
                if (!email || !user || !pwd) 
                    return res.status(400).send({'error': 'All fields are required'})             
                try{
                    bcrypt.hash(pwd, saltRounds, async function (err, hash){
                        await UsersModel.create({email: `${email}`, username: `${user}`, password: hash, age: `${age}`, is_verified: `${is_verified}`})
                    })
                    res.send({'success': 'new user created'})
                }
                catch (err){ 
                    if (err.type == ValidationError) 
                        {res.status(409).send({'error': 'username already in use'})}
                    else 
                        {res.status(500).send({'error': err.message})};
                }
        })

        //  route to log a user in (give them a token)
        router.post('/login', handleLogin)



 // export the router 
export default router 