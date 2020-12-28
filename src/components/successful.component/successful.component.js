import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios'
import {Link} from "react-router-dom";
import "./successful.component.css"
import M from "materialize-css";

const Amadeus = require('amadeus');

export default function Successful() {
  const source = useSelector(state => state.flight.source);
  const destination = useSelector(state => state.flight.destination);
  const flightOffer = useSelector(state => state.flight.flightOffer);

  // Save in prev bookings: 
  axios({
    method: "POST",
    url: 'http://localhost:5000/api/checkout',
    data: {flightOffer: flightOffer}
  }).then(res => {
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
  useEffect(() => {
    M.Collapsible.init(document.querySelectorAll((".collapsible")))
  }, [])
  return (
    <div className="successful-container">
      <div className="tick-image">
        <svg className="tic-img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 0C114.615 0 0 114.615 0 256s114.615 256 256 256 256-114.615 256-256S397.385 0 256 0zm-36.571 367.932L108.606 257.108l38.789-38.789 72.033 72.035L355.463 154.32l38.789 38.789-174.823 174.823z" /></svg>
      </div>
      <div className="booking-ref">
        <p>Booking Ref: FRA-BE-19283102-MHAKSA-DELIVERY-ORDER</p>
        <p>Print your boarding pass here</p>
      </div>
      <Link to="/" className="go-home btn btn-large transparent waves-effect waves-light">
        <i class="fas fa-home"></i>   Go Home
      </Link>
    </div>
  )
}
