const express = require("express");
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
const cors = require("cors");
require("dotenv").config();

// Initialize Express
const app = express();
const port = process.env.PORT || 5000;

// HTTP Middleware
app.use(cors());
app.use(express.json());

// Database Key

// Database Function

// Server Home
app.get("/", (req, res) => {
    res.send("Have a nice day!");
});

app.listen(port, () => {
    console.log("Running Port is:", port);
});
