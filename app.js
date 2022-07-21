require("dotenv").config();

const port = 3000;

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
    const query = req.body.cityName;
    const apiKey = process.env.OPEN_WEATHER_API_KEY;
    const unit = "imperial";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=${unit}&appid=${apiKey}`;
    https.get(url, (response) => {
        response.on("data", (data) => {
            const weatherData = JSON.parse(data);
            const icon = weatherData.weather[0].icon;
            const imageURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;
            res.write(`<p>The weather is ${weatherData.weather[0].description}</p>`);
            res.write(`<h1>The temp in ${query} is ${weatherData.main.temp} Fahrenheit.</h1>`);
            res.write(`<img src="${imageURL}">`);
            res.send();
        });
    });
});

app.listen(port, () => {
    console.log(`using port ${port}`);
});