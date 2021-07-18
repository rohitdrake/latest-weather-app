const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require("./utils/forecast");
const geoCode = require("./utils/geocode");

const app = express();
const port = process.env.port || 3000;

// Define path for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../template/views");
const partialPath = path.join(__dirname, "../template/partials");


// Setup handlebar engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));


app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Rohit Bhardwaj"
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About me",
        name: "Rohit Bhardwaj"
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Can someone help me in getting",
        need: "job",
        name: "Rohit Bhardwaj"
    });
})

app.get('/product', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        });
    }

    console.log(req.query);
    res.send({
        products: []
    });
});

app.get('/weather', (req, res) => {
    console.log(req.query.address);
    if(!req.query.address) {
        return res.send({
            error: "No address was provided"
        });
    }

    geoCode(req.query.address, (error, {center, place_name} = {}) => {
        if(error) {
            return res.send({ error });
        }

        if(!center) {
            return res.send({error: "unable to fetch location of given address"});
        }

        // upon successfully fetching latitude and longitude
        forecast({latitude: center[1], longitude: center[0]}, (error, {temperature, weather_descriptions, feelslike}) => {
            if(error) {
                return res.send({
                    error: error
                });
            }

            res.send({
                current_temperatur: temperature,
                feels_like: feelslike,
                description: weather_descriptions,
                place: place_name
            });
        })

    });
    
});

app.get('/help/*', (req, res) => {
    res.render('errorHelp', {
        title: "Help Error!",
        desc: "No further help available!"
    });
});

app.get('*', (req, res) => {
    res.render('error', {
        title: "Generic Error",
        desc: "No found!!!"
    });
});





app.listen(port, () => {
    console.log("Server is up on port " + port);
});


