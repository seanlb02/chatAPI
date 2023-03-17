import UsersModel from "../models/Users_model.js"

export const getUserData = async function(req, res, next) {
    // note: the req.params are set by the JWT authenticator middleware! and not in the route URL sent by client
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
        const check = await UsersModel.find({ username: username, "following.username" : `${req.params.user}` });
       
        if (check.length > 0) {
            res.send({'message': true})
        }
        else { res.send({'message': false}) }
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
        const result = await UsersModel.find({username:user}, 'username').select('-_id')
        if(result.length > 0) {
            res.status(200).send(result)
      
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
        const following = await UsersModel.find({ username: username}, 'following').select('-_id')
        res.send(following)
    }
    catch (err) {
        res.send({"error": err.message})
    }
        
    }

    export const getFollowers = async function(req, res) {

        const { username } = req.params.username
        try {
            const followers = await UsersModel.find({ username: username}, 'followers').select('-_id')
            res.send(followers)
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

export const followUser = async function(req, res, next) {
    const {username} = req.params.username
    const {followee} = req.params.followee
    try {
        const follow = await UsersModel.findOneAndUpdate({username:username}, {$push: {following: [{username:req.params.followee}] }} )
        const getFollowed = await UsersModel.findOneAndUpdate({username:req.params.followee}, {$push: {followers: [{username:username}] }} )

        res.send({'success': 'followed user'})
    }
    catch (err) {
        res.send({'error': err.message})
    }

}

// unfollow user controller 


// edit/update logged in user bio

export const editBio = async function(req, res, next) {
    const { username } = req.params.username;
    const {bio} = req.body

    try {
        const edit = await UsersModel.findOneAndUpdate({username:username}, {bio:`${bio}`})
        res.status(200).send({success : 'User bio updated'})
    }
    catch (err) {
        res.send({'error': err.message})
    }


}

export const addFavourite = async function(req, res, next) {
    const { username } = req.params.username;
    const { chat } = req.params.chat;

    try {
        const add = await UsersModel.findOneAndUpdate({username:username}, {$push: {favourites: [{chatname:`${req.params.chat}`}]}} )
        res.status(200).send({success : 'Chat added to users favourites'})
    }
    catch (err) {
        res.send({'error': err.message})
    }
}

export const getFavourites = async function(req, res, next) {
    const { username } = req.params.username;

    try {
        const favs = await UsersModel.find({username:username}, 'favourites')
        res.status(200).send(favs)
    }
    catch (err) {
        res.send({'error': err.message})
    }

}
