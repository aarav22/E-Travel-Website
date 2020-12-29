const mongoose = require("mongoose");

const FCarsSchema = mongoose.Schema({
    modelCar: {
        type: String,
        require: true
    },
    assistant: {
        type: String,
        require: true
    },
    capacity: {
        type: Number,
        required: true
    },
    rate: {
        type: Number,
        required: true
    },
    pictures: {
        type: Array,
        default: []
    },
    rating: {
        type: Number,
        default: 0
    }, 
    review: {
        type: Array,
        default: []
    },
    numSold: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model("FCars", FCarsSchema);