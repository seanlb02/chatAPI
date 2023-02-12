



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
    const { vip } = req.params.vip
    try {
        const branches = await BranchesModel.find({ vip_user: req.params.vip} )
        res.send(branches)
    }
    catch (err) {
        res.send({"error" : err.message})
    }
}

