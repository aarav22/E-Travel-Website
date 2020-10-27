// Modules in the backend: 
var express = require('express'); // To ease working with node
var app = express(); 


const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Backend is listening at ${PORT}!`)
})

app.get('/hey', (req, res) => {
    const {name} = req.query; 
    res.status(200).json({success: "Success!", name: name}); 
}); 