import { mongoose } from "mongoose";
import uniqueValidator from 'mongoose-unique-validator'

// this file is for creating the Users model and schema --> the Users "collection" in db
const aboutSchema = new mongoose.Schema({
    bio: {type: String, required: false, default: "Write a short bio here"},
    age: {type: Date, required: true}, // defulat format for date is: 'YYYY-MM-DD'
    nationality : {type: String, required:false, default: "Where are you from?"},
    gender: {type: String, required:false},
    height: {type: Number, required:false},
    location: {type: String, required:false},
    smoke: {type: String, required:false},
    drink: {type: String, required:false},
    children: {type: String, required:false},

})

const preferencesSchema = new mongoose.Schema({
    nationality : {type: String, required:false, default: "Where are you from?"},
    min_age: {type: Number, required: true}, 
    max_age: {type: Number, required: true},
    gender: {type: String, required:false},
    location: {type: String, required:false},
    smoke: {type: String, required:false},
    drink: {type: String, required:false},
    children: {type: String, required:false},
})

const uploadsSchema = new mongoose.Schema({
    category: {type: String, default: "Any"},
    tags: {type: String},
    image_url: {type: String},
    text: {type: String}
})

const likesSchema = new mongoose.Schema({
    chatname: {type: String, required: true}
})

const matchesSchema = new mongoose.Schema({
    chatname: {type: String, required: true}
})

const attendingSchema = new mongoose.Schema({
    chatname: {type: String, required: true}
})

const reportsSchema = new mongoose.Schema({
    reporter_id: {type: String},
    comment: {type: String},
    rating: {type: Number}
})

const profilephotosSchema = new mongoose.Schema({
    prompt: {type: String},
    image_url: {type: String}
})


// define the schema 
const usersSchema = new mongoose.Schema({
    is_admin: {type: Boolean, required: true, default: false},
    is_subscribed: {type: Boolean, required: true, default: false},
    is_begginner: {type: Boolean, default: true},
    email: {type: String, required: true, match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']},
    first_name: { type: String, required: true, unique: false },
    last_name: { type: String, required: true, unique: false },
    password: {type: String, required: true},
    profile_photos: [profilephotosSchema],
    about: [aboutSchema], 
    preferences: [preferencesSchema],
    uploads: [uploadsSchema],
    likes: [likesSchema],
    matches: [matchesSchema],
    attending: [attendingSchema],
    reports: [reportsSchema],
})

// define the model using the usersSchema template 
const UsersModel = mongoose.model("user", usersSchema); 

// Apply the uniqueValidator plugin to userSchema.
// usersSchema.plugin(uniqueValidator);



export default UsersModel