const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
const DB_NAME = "tutorial"

// routes
var testAPIRouter = require("./routes/testAPI");
var UserRouter = require("./routes/Users");
var VendorRouter = require("./routes/Vendors");
var FoodRouter = require("./routes/Food");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connection to MongoDB
mongoose.connect('mongodb+srv://Srijan:Srijan12@cluster0.18rpk.mongodb.net/Cluster0?retryWrites=true&w=majority', { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully !");
})

// setup API endpoints
app.use("/testAPI", testAPIRouter);
app.use("/user", UserRouter);
app.use("/vendor", VendorRouter);
app.use("/food", FoodRouter);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
