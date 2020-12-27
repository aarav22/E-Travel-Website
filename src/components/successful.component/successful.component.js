import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios'
const Amadeus = require('amadeus');


export default function Successful() {
    const source = useSelector(state => state.flight.source);
    const destination = useSelector(state => state.flight.destination);
    const flightOffer = useSelector(state => state.flight.flightOffer);

    // Save in prev bookings: 
    axios({
        method: "POST",
        url: 'http://localhost:5000/api/checkout',
        data: { flightOffer:  flightOffer}
    }).then(resz => {
        console.log(res);
        // console.log("Var inside: ", isSignedIn, res.data.user._id);
    })
        .catch(err => console.log("Error from checkout", err));

    // const amadeus = new Amadeus({
    //     clientId: `${process.env.REACT_APP_AMADEUS_API}`,
    //     clientSecret: `${process.env.REACT_APP_AMADEUS_SECRET}`
    // });
    // amadeus.shopping.hotelOffers.get({
    //         cityCode: destination    
    //     }).then(res => console.log(res)).catch(function (responseError) {
    //         console.log(responseError, responseError.code);
    //     });

    // Hotel recommendations
    // Safe Places: Check our safe places feature, enter your location and we'll tell you how safe it is!

    return (
        <div>
            Successful!!!
        </div>
    )
}