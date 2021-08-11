
"use strict";
const express = require("express");
const app = express(); 
const cors = require("cors"); 
require("dotenv").config();
const PORT = process.env.PORT;
const weather = require("./data/weather.json");
const weatherController=require("./controllers/Wearther.controller")
app.use(cors());
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.get("/weather", weatherController)
app.listen(PORT, () => {
    console.log(`I am a live at ${PORT}`);
});
