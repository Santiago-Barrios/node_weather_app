const path = require('path');
const express = require('express');
const hbs = require('hbs');

const { geocode } = require('./utils/geocode');
const { forecast } = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths to Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Santiago Barrios Grijalba'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Santiago Barrios Grijalba'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Can i help you?',
        name: 'Santiago Barrios Grijalba',
        helperText: 'I hope that my skills can help you.'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'you must provide an address'
        });
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            });
        }

        forecast(latitude, longitude, (error, forescatData) => {
            if (error) {
                return res.send({
                    error
                });
            }
            res.send({
                forescatData,
                location,
                address: req.query.address
            });
        })
    });

});

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        });
    }
    console.log(req.query.search)
    res.send({
        product: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Santiago Barrios Grijalba',
        msg404: 'Help article not found '
    })
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Santiago Barrios Grijalba',
        msg404: 'Page not found.'
    })
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});