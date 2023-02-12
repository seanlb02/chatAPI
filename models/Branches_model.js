import { mongoose } from "mongoose";
import uniqueValidator from 'mongoose-unique-validator'

// define the schema
const branchesSchema = new mongoose.Schema({
    vip_user: {type: String, required: true},
    text: {type: String, required: false},
    file_url: {type: String, required:false},
    timestamp: {type: Date, required: true},
})

// define the model using the schema
const BranchesModel = mongoose.model("branch", branchesSchema);

// Apply the uniqueValidator plugin to userSchema.
usersSchema.plugin(uniqueValidator); 