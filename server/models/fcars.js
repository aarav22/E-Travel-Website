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
    }
});

module.exports = mongoose.model("FCars", FCarsSchema);