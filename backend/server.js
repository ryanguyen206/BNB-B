const express = require('express')
const app = express();
require('dotenv').config();
const axios = require("axios");
const cors = require('cors')
const path = require('path'); 
app.use(cors())
const http = require('http')
const fs = require('fs');

app.use(express.static('public'))


app.get('/', (req,res) => {
  res.writeHead(200, {'Content-Type': 'text/html'})
  fs.readFile('index.html', function(err,data) {
    res.write(data);
    res.end();
  }) 
})

// app.get('/javascript', (req,res) =>{
//   res.sendFile(path.join(__dirname, "../public/index.js"))
// }) 

// app.get('/css', (req,res) =>{
//   res.sendFile(path.join(__dirname, "../public/styles.css"))
// }) 

app.get('/getData', (req, res) => {

    const {location, checkin, checkout, adults, children ,infants} = req.query
    console.log("API_KEY = " + process.env.API_KEY);
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


