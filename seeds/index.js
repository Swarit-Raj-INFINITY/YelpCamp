const Campground = require('../models/campgrounds')
const Cities = require('./cities')
const seedHelpers = require('./seedHelpers')

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/YelpCamp')
    .then(() => {
        console.log("MongoDB is Connected")
    })
    .catch(err => {
        console.log(err)
    })

const seedDB = async () => {
    await Campground.deleteMany({})
    for (let i = 0; i < 50; i++) {
        randomCity = Math.floor(Math.random() * 1000)
        const camp = new Campground({
            title: `${seedHelpers.descriptors[Math.floor(Math.random() * seedHelpers.descriptors.length)]} ${seedHelpers.places[Math.floor(Math.random() * seedHelpers.places.length)]}`,
            location: `${Cities[randomCity].city}, ${Cities[randomCity].state}`
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})