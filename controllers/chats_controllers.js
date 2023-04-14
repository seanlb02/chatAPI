import ChatsModel from '../models/Chats_model.js'

export const createChat = async function(req, res, next) {
    const { username } = req.params.username;
    const { chatname, members} = req.body
    try {
        const newChat = await ChatsModel.create({chatname : chatname, participants: members});
        res.send({'message': 'Chat created successfully'})
    }
    catch (err) {
        res.send(404, err)
    }

}

export const chatData = async function(req, res, next) {
    const { username } = req.params.username;
    const chatname = req.params.chatname;

    try { 
        const chatdata = await ChatsModel.find({chatname: chatname})
        res.send(chatdata) 
    }
    catch (err) {
        res.send(404, err)
    }

}

export const userChats = async function(req, res, next) {
    const { username } = req.params.username;

    try {
        const userchats = await ChatsModel.find({participants: `${username}`})
        res.send(userchats)
    }
    catch (err) {
        res.send(404, err)
    }
}

// this endpoint is to return another user's chats they are members of

export const theirChats = async function(req, res, next) {
    const { user } = req.params.user;

    try {
        const chats = await ChatsModel.find({participants: `${req.params.user}`})
        res.send(chats)
    }
    catch (err) {
        res.send(404, err)
    }
}

export const addMessage = async function(chat, feed) {
    try{
        const add = await ChatsModel.findOneAndUpdate({chatname:chat}, {$push: {messages: [feed]}} )
    }
    catch (err) {
        console.log(err)
    }
}

export const getMessages = async function(req, res, next) {
    const { chatname } = req.params.chatname;

    try {
        const messages = await ChatsModel.find({chatname:req.params.chatname})
        res.status(200).send(messages)
    
    }
    catch (err) {
        console.log(err)
    }
}

