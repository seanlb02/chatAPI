import { mongoose } from "mongoose";
import uniqueValidator from 'mongoose-unique-validator'

// define the schema
const eventsSchema = new mongoose.Schema({
    type: {type: String, required: true, default:"Feature"},
    geometry: {
        type: {type: String, required: true, default:"Point"},
        coordinates: {type: Array, required: true}
    }, 
    properties: {
        date: {type: String, required: true},  
        venue_name: {type: String}, 
        event_name: {type: String}, 
        genre: {type: String}, 
        price: {type: String},
        time: {type: String}
    }
})

// define the model using the schema
const EventsModel = mongoose.model("Events", eventsSchema);

// // Apply the uniqueValidator plugin to userSchema.
// usersSchema.plugin(uniqueValidator); 

export default EventsModel;