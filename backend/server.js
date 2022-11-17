const express = require('express')
const app = express();
require('dotenv').config();
const axios = require("axios");
const cors = require('cors')
app.use(cors())



  app.get('/', (req, res) => {

    const {location, checkin, checkout, adults, children ,infants} = req.query
    console.log(location, checkin, checkout, adults, children, infants)

    const options = {
        method: 'GET',
        url: 'https://airbnb13.p.rapidapi.com/search-location',
        params: {
          location: location,
          checkin: checkin,
          checkout: checkout,
          adults: adults,
          children: children,
          infants: infants,
          page: '1'
        },
        headers: {
          'X-RapidAPI-Key': process.env.API_KEY,
          'X-RapidAPI-Host': 'airbnb13.p.rapidapi.com'
        }
    };
    
    axios.request(options).then(function(response) {
        res.json(response.data.results);
    }).catch(function (error) {
        console.error(error);
    });
});



app.listen(3000, () => console.log('Server is running...'))


