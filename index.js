const express = require('express');
const app = express();
const port = 3000
const path = require('path')
const ejsMate = require('ejs-mate')
const methodOverride = require('method-override')
app.use(methodOverride('_method'))
const Campground = require('./models/campgrounds')

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/YelpCamp')
    .then(() => {
        console.log("MongoDB is Connected")
    })
    .catch(err => {
        console.log(err)
    })

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({ extended: true }))


app.listen(port, () => {
    console.log(`listening on  http://localhost:${port}`)
})

app.get("/", (req, res) => {
    res.render("home")
})

app.get("/campgrounds", async (req, res) => {
    const campgrounds = await Campground.find({})
    res.render("campgrounds/index", { campgrounds })
})

app.post("/campgrounds", async (req, res) => {
    const camp = new Campground({ title: req.body.title, location: req.body.location })
    await camp.save()
    res.redirect(`/campgrounds/${camp._id}`)
})

app.get("/campgrounds/new", (req, res) => {
    res.render("campgrounds/new")
})

app.get("/campgrounds/:id", async (req, res) => {
    const camp = await Campground.findById(req.params.id)
    res.render("campgrounds/show", { camp })
})

app.get("/campgrounds/:id/edit", async (req, res) => {
    const camp = await Campground.findById(req.params.id)
    res.render("campgrounds/edit", { camp })
})

app.put("/campgrounds/:id", async (req, res) => {
    const { id } = req.params
    let camp = await Campground.findByIdAndUpdate(id, { ...req.body })
    res.redirect(`/campgrounds/${camp._id}`)
})

app.delete("/campgrounds/:id", async (req, res) => {
    const { id } = req.params
    await Campground.findByIdAndDelete(id)
    res.redirect("/campgrounds")
})


