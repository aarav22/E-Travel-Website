const Fcars = require("../models/fcars");

module.exports = {

    async see_fcar(req, res) {
        try {
            if (req.query.id) {
                const fcar = await Fcars.findById(req.params.id)
                res.json(fcar);
            } else {
                const fcars = await Fcars.find();
                res.json(fcars)
            }
        } catch (err) {
            res.json({ message: err })
        }
    }
}