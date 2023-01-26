// server/index.js

const express = require("express");
const axios = require("axios");
const cors = require('cors');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors({
    origin: '*'
}));

function makeApiCall(location, format, u, API_KEY){
  const url = `https://yahoo-weather5.p.rapidapi.com/weather?location=${location}&format=${format}&u=${u}&appid=${API_KEY}`
  return axios.get(url);
}

app.get("/api/weather", (req, res) => {
  const lat = req.query.lat;
  const lon = req.query.lon;
  const options = {
    method: 'GET',
    url: 'https://weatherbit-v1-mashape.p.rapidapi.com/current',
    params: {lon: lon, lat: lat},
    headers: {
      'X-RapidAPI-Key': 'f3b4a1ce9cmshe9e8ade6b32071bp1782adjsn5aa35a72a16b',
      'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com'
    }
  };
  axios.request(options).then(function (response) {
    res.send(response.data);
  }).catch(function (error) {
      console.error(error);
  });
});

app.get("/api/weather_by_location", (req, res) => {
  const location = req.query.location;
  const options = {
    method: 'GET',
    url: 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather',
    params: {city: location},
    headers: {
      'X-RapidAPI-Key': 'f3b4a1ce9cmshe9e8ade6b32071bp1782adjsn5aa35a72a16b',
      'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
    }
  };
  axios.request(options).then(function (response) {
    res.send(response.data);
  }).catch(function (error) {
      console.error(error);
  });
});

app.get("/api/location", (req, res) => {
  const location = req.query.location;
  const options = {
    method: 'GET',
    url: 'https://weather338.p.rapidapi.com/locations/search',
    params: {query: location, language: 'en-US'},
    headers: {
      'X-RapidAPI-Key': 'f3b4a1ce9cmshe9e8ade6b32071bp1782adjsn5aa35a72a16b',
      'X-RapidAPI-Host': 'weather338.p.rapidapi.com'
    }
  };
  axios.request(options).then(function (response) {
    res.send(response.data);
  }).catch(function (error) {
      console.error(error);
  });
});


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
