//name, participants[]

import { mongoose } from "mongoose";
import uniqueValidator from 'mongoose-unique-validator'

const messagesSchema = new mongoose.Schema({
    sender: {type: String, required: true},
    content: {type: String, required: true},
    timestamp: {type: Date, required: true}
}) 

const chatsSchema = new mongoose.Schema({
    chatname: {type: String, required: true, unique: true},
    participants: {type: Array, required: true},
    messages: [messagesSchema]
})

const ChatsModel = mongoose.model("chat", chatsSchema); 


export default ChatsModel;
// Selecting participants in client will be:

// userModel.find({followers: {user: })

// retriving messages in client:
// chatsModel.find({ chatname: req.params.chatname }, messages).sort({messages.timestamp: -1 timestamp})