const express = require("express");
const https = require("https");
const app = express();

const port = 3000;

app.get("/", (req, res) => {
    const url = "https://api.openweathermap.org/data/2.5/weather?q=Chicago&units=imperial&appid=eabc774d2d18ce9ade329576ce02bf84";
    https.get(url, (response) => {
        console.log(response.statusCode);
        response.on("data", (data) => {
            const weatherData = JSON.parse(data);
            // console.log(weatherData);
            const icon = weatherData.weather[0].icon;
            const imageURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;
            res.write(`<p>The waether is ${weatherData.weather[0].description}</p>`);
            res.write(`<h1>The temp is ${weatherData.main.temp} Fahrenheit</h1>`);
            res.write(`<img src="${imageURL}">`);
            res.send();
        });
    });
});

app.listen(port, () => {
    console.log(`using port ${port}`);
});