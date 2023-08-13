import { model, mongoose } from "mongoose";


const uploadsSchema = new mongoose.Schema({
    category: {type: String, default: "Any"},
    tags: {type: String},
    image_url: {type: String},
    text: {type: String}

})


const UploadsModel = mongoose.model('upload', uploadsSchema)

export default UploadsModel;