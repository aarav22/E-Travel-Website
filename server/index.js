// Modules in the backend: 
const express = require('express'); // To ease working with node
const bodyParser = require('body-parser'); // For retreiving values from req.body
const cors = require('cors'); // For cross origin requests 
const mongoose = require('mongoose');


require('dotenv').config();
const app = express(); 

// Connection with MongoDB Atlas
const uri = process.env.ATLAS_URI;
mongoose.connect(uri,
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false }
);

const connection = mongoose.connection; 
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

app.use(bodyParser.urlencoded({ extended: true })); //  middleware for parsing bodies from URL
app.use(bodyParser.json()); // middleware for parsing json objects
app.use(cors()); 


const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Backend is listening at localhost:${PORT}!`)
})

app.get('/hey', (req, res) => {
    const {name} = req.query; 
    res.status(200).json({success: "Success!", name: name}); 
}); 