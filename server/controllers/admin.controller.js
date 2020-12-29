const fcars = require('../models/fcars');
const UserProfile  = require('../models/userProfile');

module.exports = {


    // update_fcars(req, res) {
    //     const {id} = req.params; 
    //     const { modelCar, assistant, capacity, rate, pictures} = req.body;
    //     fcars.findById(id).exec((err, fcars) => {
    //         if(err) {console.log('Error from UpdateFcars Admin', err);}
    //         fcars.modelCar = model;
    //         fcars.assistant = assistant;
    //         fcars.capacity = capacity;
    //         fcars.rate = rate;
    //         fcars.pictures = pictures;
    //         fcars.save(); 
    //         res.status(200).json({fcars});
    //     })
    // },

    get_num_bookings(req, res) {
        fcars.findById("5fbf3d7421e5ae4a0450191a").exec((err, fcars) => {
            if(err) {return res.status(400).json({success: false, err:err});}
            return res.status(200).json({success:true, numBookings: fcars.numSold});
        });
    }

}
