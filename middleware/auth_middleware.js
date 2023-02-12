import express from "express";
import  UsersModel  from "../models/Users_model.js"

import bcrypt from "bcryptjs"
const saltRounds = 10
import jwt from "jsonwebtoken"
import uniqueValidator from "mongoose-unique-validator"



        //middleware is responsible for creating a new user document 
        const registerUser = async (req, res, next) => {
            //1. deconstruct the request body sent by client 
            const { email, user, pwd} = req.body;
            //2. if client app does not send data in the request body then return an error message:
            if (!email || !user || !pwd) return res.status(400).send({'error': 'All fields are required'})
            // 3. generate salt, encrypt and salt the incoming password
            // 4. create the new user document (with password hashed/salted)
            try {
                bcrypt.hash(pwd, saltRounds, async function (err, hash){
                   await UsersModel.create({email: `${email}`, username: `${user}`, password: hash})
                })
                res.send({'success': 'new user created'})
                next();
                } 
            catch (error) {
                if (error instanceof mongoose.Error.ValidationError)
                    {return res.status(400).send({'message': 'Username is already taken'})}
                return res.send( {'error': error.message });
                
                }
        }
            
            
        // this function/middleware takes a request body and cross-checks it with the database, then returns a token if exits 
        const handleLogin = async (req, res, next) => {
            // the route this function belongs to will require {username: username, password: password} from the client 
            // deconstruct/extract data from request body sent by client 
            const { usr, pwd } = req.body;
            // if client app does not send data in the request body then return an error message:
            if (!usr || !pwd) return res.send({'message': 'Username and password must be provided'})
            // build a select statement to query mongoDB User collection for the entered username
            const foundUsername = await UsersModel.find({username: `${usr}`})
            // if username does not exist in database, then return a no-data error message:
            if (foundUsername.length < 1){
                 return res.status(400).send({'message': 'Username or password is invalid'})
            }
            
            // if userame exists in system, then check the password against the stored encrypted password
            const hashedpass = foundUsername[0].password
            const match = await bcrypt.compare(pwd, hashedpass);
            // if the state of match is 'true': 
            try{
            if (match) {
                // create a JWT for user that expires in 24 hrs (requiring a re-log in)
                function getAccessToken(username){ 
                    return jwt.sign(username,'secret', {expiresIn:'1d'})
                };
                const accessToken = getAccessToken({username: usr})
                // return the token to the client:
                res.send({ 'token' : accessToken})
                next();
            } else {
                // return error saying no data found if passwords dont match 
                return res.status(400).json({'message': 'Username or password is invalid'})
                next();
            }
        }
            catch (error) {
                if (error.name === TypeError)
                    {return res.status(400).json({'message': 'Username or password is invalid'})}
                return res.send( {'error': error.message });
                next();
                }
        }

        // AUTHORISATION MIDDLEWARE: (authenticates token and checks if admin)

        //  this middleware insists that each authourisation header for each route request has the token stored in client storage
        const authenticateToken = async function(req, res, next) {
                // extract the token from the authorization header, remove quotes of exists 
                const authHeader = req.headers['authorization']
                // if no token is sent in request, relay an error:
                if(!authHeader){
                    res.send( {'error': 'no token provided'} );
                }
                // if there is an authorization token sent then continue
                const token = authHeader && authHeader.split(' ')[1]
                //   if  token cant be parsed, relay an error back to client 
                if (token == null) return res.sendStatus(401)
                //   verify the token if exists:
                jwt.verify(token, 'secret', (err, user) => {
                    req.params.username = user
                    if(err){
                        res.send({'error': err.message})
                    }
                //   if no error is raised by verify() then proceed to next middleware in the route 
                else{ next();}
                })
        }

        const checkAdmin = async function(req, res, next) {
                const {username} = req.params.username
                const admin = await UsersModel.find({username: username, is_admin: true})
                if (admin.length > 0) {
                    next();
                }
                else {return res.send({'error': 'unauthorized access'})}
        }

        const checkVerified = async function(req, res, next) {
            const {username} = req.params.username
            const admin = await UsersModel.find({username: username, is_verified: true})
            if (admin.length > 0) {
                res.send({"result" : "true"});
            }
            else {return res.send({'error': 'unauthorized access'})}
    }

        const doesUserFollow = async function(req, res, next) {
            const {username} = req.params.username
            const {followee} = req.params.followee
            const follows = await UsersModel.find({username: req.params.followee, followers: {username: username}})
            if (follows.length > 0) {
                next();
        }
        else {return res.send({'error': 'unauthorized access'})}
    }

export  {
    registerUser,
    handleLogin,
    authenticateToken,
    checkAdmin,
    checkVerified,
    doesUserFollow,
}