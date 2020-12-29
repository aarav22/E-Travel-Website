let User = require('../models/userProfile')
let FCar = require('../models/fcars')
const {OAuth2Client} = require('google-auth-library')
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID); 

module.exports = {
    user_login(req, response) {
        const {tokenId} = req.body;
        client.verifyIdToken({idToken: tokenId, audience: process.env.REACT_APP_GOOGLE_CLIENT_ID}).then(res => {
            const {email_verified, name, email, picture} = res.payload;
            if (email_verified) {
                User.findOne({email}).exec((err, user) => {
                    if(err) {
                        console.log("Error from login backend: ", err)
                        return response.status(400).json({isSignedIn: false, user: null, msg: false, 
                            error: "Error from finding user in google login"
                        })
                    } else {
                        if (user) { 
                            return response.status(200).json({isSignedIn: true, msg: "user exists in db", user: user});
                        } else {
                            let new_user = new User({
                                name: name,
                                email: email,
                                profile_picture: picture
                            });
                            new_user.save((err, data) => {
                                if(err) {
                                    console.log("Error from login backend: ", err)
                                    return response.status(400).json({isSignedIn: false, msg: err, user: null}); 
                                }
                                response.status(200) 
                                        .json({
                                            isSignedIn: true, msg: "user logged in", user: new_user // replaced user with new_user
                                        });           
                            })
                        }
                    }
                })
            }
        }); 
    },

    user_logout(req, res) {
        // console.log("User ID: from logout: ",  );
        const {userId} = req.body; 
        // console.log(userId, req.body); 
        User.findOne({ _id: userId }, (err, doc) => {
            if (err) return res.json({ 
                isSignedIn: false,
                user: null, msg: false, error:err});
            return res.status(200).send({
                isSignedIn: false,
                user: null,
                msg: "User logged out!"
            });
        });
    },

    update_contact(req, res) {
        const {userId, contact} = req.body;
        User.findOneAndUpdate({_id: userId}, {$set: {contact: contact}}).exec((err, user) => {
            if (err) {
                return res.status(400).json({
                    error: "Error from updating contact info"
                })
            }
            return res.status(200).json({
                user: user
            })
        }); 
    },

    update_address(req, res) {
        const {userId, address} = req.body;
        User.findOneAndUpdate({_id: userId}, {$set: {address: address}}, { new: true }).exec((err, user) => {
            if (err) {
                return res.status(400).json({
                    error: "Error from updating address info",
                    errorMsg: err
                })
            }
            return res.status(200).json({
                user: user
            })
        }); 
    },

    delete_address(req,res) {
        const {userId, name} = req.body;
        User.findOneAndUpdate(
            {_id: userId},
            {
                "$pull":
                {"address": {name: name}}
            },
            { new: true },
            (err, user) => {
                if (err) {
                    return res.status(400).json({
                        error: "Error from deleting address",
                        errorMsg: err
                    }); 
                }
                return res.status(200).json({
                    user: user
                })
            }
        );
    }, 
    
    on_payment(req, res) {
        let history = [];
        let singleFlightOffer = req.body.singleFlightOffer;
        let returnFlightOffer = req.body.returnFlightOffer;
        let travellerInfo = req.body.travellerInfo;

        history.push({  // Updating user's past purchases: 
            purchase_date: Date.now(),
            singleFlightOffer: singleFlightOffer,
            returnFlightOffer: returnFlightOffer,
            travellerInfo: travellerInfo
        })

        User.findOneAndUpdate(
            { _id: req.body.userId },
            { $push: { history: history }, $set: { cart: [] } },
            { new: true },
            (err, user) => {
                if (err) return res.json({ success: false, err });
                return res.status(200).json({success: true});
            });   
    },

    post_reviews(req, res) { 
        const {userId, fcarId, review} = req.body;
        User.findOneAndUpdate(
            { _id: userId }, {
                $push: 
                {reviews: {
                    fcarId: fcarId,
                    review: review // has rating, comment
            }}}, (err, user) => {
                if (err) return res.status(400).send("Error from post-reviews: ", err);
            }
        )

        FCar.findOneAndUpdate(
            {_id: fcarId}, {
            $push:
            {reviews: {
                userId: userId, 
                review: review
            }}}, (err, user) => {
                if (err) return res.status(400).send("Error from post-reviews: ", err);
            }
        )
    }
}