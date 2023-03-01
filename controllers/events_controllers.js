

export const getVenues = async function(req, res) {
    try {
        const events = await EventsModel.find({ date: new Date()} )
        res.send(events) 
    }
    catch (err) {
        res.send({"error" : err.message})
    }
}