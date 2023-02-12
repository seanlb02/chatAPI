import express from "express";
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from 'cors'

import auth_routes from './routes/auth_routes.js' 
import users_routes from './routes/user_routes.js' 
import branches_routes from './routes/branches_routes.js'
  
const app = express();
const PORT = 3001;
  

// this middleware will take any json response from an express app route and parse it to a js object
app.use(express.json())

// enable cors
app.use(cors())

// init routes 
app.use('/auth', auth_routes)
app.use('/users', users_routes)
app.use('/branches', branches_routes)

mongoose.set('strictQuery', true)

// connect mongoose to the database 
mongoose.connect("mongodb+srv://seanchat:Budapest123!@cluster0.cttmem1.mongodb.net/chattree?retryWrites=true&w=majority")
.then((m) => console.log(m.connection.readyState === 1 ? 'Mongoose connected!' : 'Failed to connect'))
.catch((err) => console.log(err))



app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);