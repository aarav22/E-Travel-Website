const fcars = require('../models/fcars');
const UserProfile  = require('../models/userProfile');

module.exports = {

    create_fcars(req, res) {
        const { model, assistant, capacity, rate, pictures} = req.body;
        let new_fcars = new fcars({
            model, 
            assistant, 
            capacity,
            rate,
            pictures
        });
        new_fcars.save();
        res.status(200).json({fcars: new_fcars});
    },

    update_fcars(req, res) {
        const {id} = req.params; 
        const { modelCar, assistant, capacity, rate, pictures} = req.body;
        fcars.findById(id).exec((err, fcars) => {
            if(err) {console.log('Error from UpdateFcars Admin', err);}
            fcars.modelCar = model;
            fcars.assistant = assistant;
            fcars.capacity = capacity;
            fcars.rate = rate;
            fcars.pictures = pictures;
            fcars.save(); 
            res.status(200).json({fcars});
        })
    },

    delete_fcars(req, res) {
        const {id} = req.params;
        fcars.deleteOne({_id:id}).exec((err, fcars) => {
        if(err) {console.log('Error from Deletefcars Admin', err);}
        res.status(200).json({fcars});
        });
    }

}
