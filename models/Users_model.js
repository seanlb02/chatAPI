import { mongoose } from "mongoose";
import uniqueValidator from 'mongoose-unique-validator'

// this file is for creating the Users model and schema --> the Users "collection" in db
const followerSchema = new mongoose.Schema({
    username: {type: String, required: true}
})

const followingSchema = new mongoose.Schema({
    username: {type: String, required: true}
})

const favouritesSchema = new mongoose.Schema({
    chatname: {type: String, required: true}
})

// define the schema 
const usersSchema = new mongoose.Schema({
    email: {type: String, required: true, match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']},
    username: { type: String, required: true, unique: false },
    password: {type: String, required: true},
    age: {type: Date, required: true}, // defulat format for date is: 'YYYY-MM-DD'
    image_url: {type: String, required: false}, // links to image store uri
    bio: {type: String, required: false, default: "Write a short bio here"},
    followers: [followerSchema], 
    following: [followingSchema],
    favourites: [favouritesSchema],
    is_admin: {type: Boolean, required: false, default: false},
    is_verified: {type: Boolean, required: false, default: false}
})

// define the model using the usersSchema template 
const UsersModel = mongoose.model("user", usersSchema); 

// Apply the uniqueValidator plugin to userSchema.
// usersSchema.plugin(uniqueValidator);



export default UsersModel