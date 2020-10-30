const mongoose = require("mongoose");

const FCarsSchema = mongoose.Schema({
    model: {
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
    }
});

module.exports = mongoose.model("FCars", FCarsSchema);