export const getUserData = async function(req, res, next) {
    // note: the req.params are set by the JWT authenticator middleware! and not in the route URL
    const {username} = req.params.username
    const userData = await UsersModel.find({username:username}, 'username bio')
    res.send(userData)
    next();
}


export const getAllFollowers = async function(req, res) {
    const { username } = req.params.username;
    try {
        const followers = await UsersModel.find({ username: username}, 'followers');
        res.send(followers)
    }
    catch (err) {
        res.send({"error": err.message})
}
}

// use this on each useEffect in client to authorize page/chat window render for certain verified users 
export const checkIfFollowing = async function (req, res) {
    const { username } = req.params.username;
    const { verified } = req.params.user
    try{
        const check = await UsersModel.findOne({ username: req.params.user}, { followers: {username: username} }, 'followers');
        if (check.length > 0) {
            res.send({"success" : true})
        }
        else { res.send({"error" : false}) }
    }
    catch(err) 
    { res.send({"error" : err})}
    
}

// for the homepage 
export const getVipFollowers = async function(req, res) {
    const { username } = req.params.username;
    try {
        const followers = await UsersModel.find({ username: username, followers: {is_verified: true}}, 'followers');
        res.send(followers)
    }
    catch (err) {
        res.send({"error": err.message})

}}
 


// get vip :user data for regular user --> to render their profile/branch page
export const getVipData = async (req, res) => {
    const { username } = req.params.username;
    const {user} = req.params.user;
    try{
        const data = await UsersModel.find({ username: req.params.user}, 'username bio')
        res.send(data)
    }
    catch (err) {
        res.send({"error": err.message})
    }

}

export const searchVerifiedUsers = async function(req, res) {
        
    const user = req.params.user
    try {
        const result = await UsersModel.find({username:user, is_verified: true}, 'username').select('-_id')
        if(result.length > 0) {
            res.send(result)
      
        }
        else {
            res.status(400).send({'error': 'user not found'});
        }
    }
    catch (err) {
        res.send({'error': err.message})
    }}

    // get list of verified accounts a user is following to render. 
 export const getFollowing = async function(req, res) {

    const { username } = req.params.username
    try {
        const following = await UsersModel.find({ username: username}, 'username').select('-_id')
        res.send(following)
    }
    catch (err) {
        res.send({"error": err.message})
    }
        
    }


    // function for user to delete their account 
export const deleteSelf = async function(req, res, next) {
        const {username} = req.params.username
        try {
        // delete the user, their entries, their scores 
        const remove = await UsersModel.deleteOne({username: username})
        const removeEntries = await EntriesModel.deleteMany({username: username})
        const removeScores = await ScoresModel.deleteMany({username: username})
        res.send("account successfully deleted")
        next()
        } 
        catch (err) {
            res.send({'error': err.message})
        }
    }