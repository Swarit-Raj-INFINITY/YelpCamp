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
            location: `${Cities[randomCity].city}, ${Cities[randomCity].state}`,
            price: Math.floor(Math.random() * 20) + 10,
            image: `https://picsum.photos/800/${Math.floor(Math.random() * 200) + 600}`,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor omnis aut quidem, et sit, voluptatum eos laudantium, necessitatibus exercitationem sint voluptatibus corporis. Delectus tenetur dolores saepe ea odit ratione autem placeat facere, in necessitatibus unde magni iure quia, amet nemo sapiente eaque provident."
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})