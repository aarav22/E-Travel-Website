const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userProfileSchema = new Schema ({
    name: {
        type: String, 
        required: true
    }, 
    email: {
        type: String, 
        required: true
    }, 
    profile_picture: {
        type: String
    },
    contact_number: {
        type: Number, 
        required: false
    },
    address: {
        type: Array, 
        required: false
    }, 
    wishlist: {
        type: Array, 
        default: []
    }, 
    cart: {
        type: Array,
        default: []
        }, 
    ratings: {
        type: Array, 
        default: []
    },
    history: {
        type:Array,
        default: []
    }

});

module.exports = mongoose.model('UserProfile', userProfileSchema); 
