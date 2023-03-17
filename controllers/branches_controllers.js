



export const postBranch = async function(req, res) {
    const {username} = req.params.username
    const {timestamp, file_url, text} = req.body
    
        //If client app does not send data in the request body then return an error message:
        if (!text) return res.status(400).send({'error': 'A message is required'})
        try{
            await BranchesModel.create({vip_user: `${username}`, timestamp: `${timestamp}`, text: `${text}`, file_url: `${file_url}`})
            res.send({'success': 'message stored'})
        }
        catch (error) {
            return res.send( {'error': error.message });
        }
}

export const getBranches = async function(req, res) {
    const { username } = req.params.username 
    const { chatname } = req.params.chatname
    try {
        const branches = await BranchesModel.find({ chatname: req.params.chatname} )
        res.send(branches)
    }
    catch (err) {
        res.send({"error" : err.message})
    }
}

export const getChats = async function() {
    const { username } = req.params.username
    // chats where username is in 'members' field/array 
    
}

