const express = require('express')
const app = express()

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// a route
const axios = require("axios");
app.get("/weather", (req, res) => {
  const city = req.query.city;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=29c03c1ee13d8bb534a57f04fd9bc6d6`;
  axios
    .get(url)
    .then((response) => {
      const weatherData = {
        temperature: response.data.main.temp,
        description: response.data.weather[0].description,
        icon: response.data.weather[0].icon,
      };
      res.json(weatherData);
    })
    .catch((error) => {
      res.status(500).json({ error: "An error occurred" });
    });
});

app.listen(3000, () => {
  console.log(`Server running on port 3000 :)`);
});

//29c03c1ee13d8bb534a57f04fd9bc6d6