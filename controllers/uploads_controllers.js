import UploadsModel from "../models/Uploads_model";
import UsersModel from "../models/Users_model";

// Render list of ALL uploads 

export async function getAllUploads(req, res) {

    const {user_id} = req.params.user_id

    try {
        const query_body = await UsersModel.find({_id: user_id}, 'preferences')
        const users = await UsersModel.find({about: query_body}, 'first_name, about, uploads')

        res.send(users)
    }
    catch (err) {
        res.status(400).send(err)
    }
}

// An end point to retrieve category specific uploads (tag specified in query param)
export async function getThemedUploads(req, res) {
    
    const {user_id} = req.params.user_id
    const {theme} = req.params.theme
    
    try {
        const query_body = await UsersModel.find({_id: user_id}, 'preferences')
        const themed_uploads = await UsersModel.find({about: query_body, uploads:{category: theme}}, 'first_name, about, uploads')
        res.send(tagged_uploads)
    }
    catch (err) {
        res.status(400).send(err)
    }
}

// render list of tags relating to selected theme (theme specified in query param)
    // this is handled client side and taken from above endpoint - i.e. themed_uploads.map(el => <div onClick({hit below endpoint/{el}})>el.uploads.tag</div>)


// An end point to retrieve tag specific uploads (tag specified in query param)
export async function getTaggedUploads(req, res) {
    
    const {user_id} = req.params.user_id
    const {tag} = req.params.tag
    
    try {
        const query_body = await UsersModel.find({_id: user_id}, 'preferences')
        const tagged_users = await UsersModel.find({about: query_body, uploads:{tag: tag}}, 'first_name, about, uploads')

    }
    catch (err) {
        res.status(400).send(err)
    }
}

// endpoint to CREATE new uplaod
export async function newUpload(req, res) {
    
    const {user_id} = req.params.user_id
    const {timestamp, image_url, text} = req.body

    
    try {
        const query_body = await UsersModel.find({_id: user_id})
        const tagged_users = await UsersModel.find({about: query_body, uploads:{tag: tag}}, 'first_name, about, uploads')

    }
    catch (err) {
        res.status(400).send(err)
    }
}
