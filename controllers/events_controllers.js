import EventsModel from '../models/Events_model.js'


export const getEvents = async function(req, res) {
    const today = new Date().toDateString()
    try {
        const events = await EventsModel.find({ 'properties.date' : today})
        
        res.send(events)
    }
    catch (err) {
        res.send({"error" : err.message})
    }
}

export const postEvent = async function(req, res) {
        const today = new Date().toDateString()
        const events = await EventsModel.create({
            
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: [
                -33.895871027756584,
                151.17423997600028
              ]
            },
            properties: {
              date: today,
              venue_name: "The Duke",
              event_name: "test",
              genre: "Rock",
              price: "free"
            }
          })
        res.send('success')
}