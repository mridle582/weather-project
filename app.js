require("dotenv").config();
const express = require("express");
const https = require("https");
const app = express();

const port = 3000;

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.listen(port, () => {
    console.log(`using port ${port}`);
});

// const query = "London";
// const apiKey = process.env.OPEN_WEATHER_API_KEY;
// const unit = "imperial";
// const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=${unit}&appid=${apiKey}`;
// https.get(url, (response) => {
//     console.log(response.statusCode);
//     response.on("data", (data) => {
//         const weatherData = JSON.parse(data);
//         const icon = weatherData.weather[0].icon;
//         const imageURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;
//         res.write(`<p>The waether is ${weatherData.weather[0].description}</p>`);
//         res.write(`<h1>The temp is ${weatherData.main.temp} Fahrenheit</h1>`);
//         res.write(`<img src="${imageURL}">`);
//         res.send();
//     });
// });