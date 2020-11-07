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

// Setting controllers: 
const user_controller = require('./controllers/user.controller');
const admin_controller = require('./controllers/admin.controller');
const fcar_controller = require('./controllers/fcars.controller');

// APIs: 
app.post('/api/login', user_controller.user_login);
app.post('/api/logout', user_controller.user_logout);
app.post('/api/update_adress', user_controller.update_address);
app.post('/api/update_contact', user_controller.update_contact);


app.post('/api/checkout', user_controller.on_payment);
app.post('/api/post_review', user_controller.post_reviews)

app.get('/api/fcars', fcar_controller.see_fcar);

app.post('/api/fcars', admin_controller.create_fcars);
app.put('/api/fcars', admin_controller.update_fcars);
app.delete('/api/fcars', admin_controller.delete_fcars);



const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Backend is listening at localhost:${PORT}!`)
})

