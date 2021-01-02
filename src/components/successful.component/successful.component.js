import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios'
import {Link} from "react-router-dom";
import Pdf from "react-to-pdf";
import "./successful.component.css"
import M from "materialize-css";

const Amadeus = require('amadeus');
const ref = React.createRef();

const BoardingPass = (props) => {
  const convertTime = (date) => {
    var newDate = new Date(date);
    var time = newDate.toLocaleTimeString();
    return time;
  }

  const convertDate = (date) => {
    var newDate = new Date(date);
    newDate = newDate.toLocaleDateString();
    return newDate;
  }

  return (
  <div className="book-main-left">
          <div className="book-top">ITINERARY</div>
          <div className="book-mid up">
            <div className="mook-mid-left">
              <span className="img"></span>
              <h6>{props.singleFlightOffer.itineraries[0].segments[0].carrierCode + " " + props.singleFlightOffer.itineraries[0].segments[0].aircraft.code}</h6>
              <p>AI-803</p>
            </div>
            <div className="book-mid-right">
              <div className="book-mid-dep">
                <div className="mid-time">{convertTime(props.singleFlightOffer.itineraries[0].segments[0].departure.at)}</div>
                <div className="mid-date">{convertDate(props.singleFlightOffer.itineraries[0].segments[0].departure.at)}</div>
                <div className="mid-dep">{props.singleFlightOffer.itineraries[0].segments[0].departure.iataCode}</div>
                <div className="mid-term">{`Terminal: ${props.singleFlightOffer.itineraries[0].segments[0].departure.terminal}`}</div>
              </div>
              <div className="book-mid-time"><p>1h 35mins</p></div>
              <div className="book-mid-arr">
                <div className="mid-time">{convertTime(props.singleFlightOffer.itineraries[0].segments[0].arrival.at)}</div>
                <div className="mid-date">{convertDate(props.singleFlightOffer.itineraries[0].segments[0].arrival.at)}</div>
                <div className="mid-dep">{props.singleFlightOffer.itineraries[0].segments[0].arrival.iataCode}</div>
                <div className="mid-term">{`Terminal: ${props.singleFlightOffer.itineraries[0].segments[0].arrival.terminal}`}</div>
              </div>
            </div>
          </div>
          {props.isReturn && (

            <div className="book-mid down">
              <div className="mook-mid-left">
                <span className="img"></span>
                <h6>{props.singleFlightOffer.itineraries[0].segments[0].carrierCode + " " + props.singleFlightOffer.itineraries[0].segments[0].aircraft.code}</h6>
              </div>
              <div className="book-mid-right">
                <div className="book-mid-dep">
                  <div className="mid-time">{convertTime(props.returnFlightOffer.itineraries[0].segments[0].departure.at)}</div>
                  <div className="mid-date">{convertDate(props.returnFlightOffer.itineraries[0].segments[0].departure.at)}</div>
                  <div className="mid-dep">{props.returnFlightOffer.itineraries[0].segments[0].departure.iataCode}</div>
                  <div className="mid-term">{`Terminal: ${props.returnFlightOffer.itineraries[0].segments[0].departure.terminal}`}</div>
                </div>
                <div className="book-mid-time"><p>1h 35mins</p></div>
                <div className="book-mid-arr">
                  <div className="mid-time">{convertTime(props.returnFlightOffer.itineraries[0].segments[0].arrival.at)}</div>
                  <div className="mid-date">{convertDate(props.returnFlightOffer.itineraries[0].segments[0].arrival.at)}</div>
                  <div className="mid-dep">{props.returnFlightOffer.itineraries[0].segments[0].arrival.iataCode}</div>
                  <div className="mid-term">{`Terminal: ${props.returnFlightOffer.itineraries[0].segments[0].arrival.terminal}`}</div>
                </div>
              </div>
            </div>
          )}
          <div className="book-bottom">
            <p>Mandatory check-list for passengers (in lieu of COVID-19):</p>
            <p>➡ Certify your health status through the Aarogya Setu app or the self-declaration form at the airport.</p>
            <p>➡ Remember to web check-in before arriving at the airport; carry a printed or soft copy of the boarding pass.</p>
            <p>➡ Please reach at least 2 hours prior to flight departure.</p>
            <p>➡ Please wear a kfcuing mask.</p>
            <p>➡ PPE kits will be provided and are compulsory to be used.</p>
          </div>
        </div>
  );
}


export default function Successful(props) {
  const singleFlightOffer = useSelector(state => state.flight.singleFlightOffer);
  const returnFlightOffer = useSelector(state => state.flight.returnFlightOffer);
  const travellerInfo = useSelector(state => state.flight.travellers); 
  const [isBooked, setBooked] = useState(false);

  const user = useSelector(state => state.user.curr_user);
  console.log("User:", user)
  var isReturn = false;
  if (returnFlightOffer) {
    isReturn = true;
  }

  // const source = useSelector(state => state.flight.source);
  // const destination = useSelector(state => state.flight.destination);
  // const flightOffer = useSelector(state => state.flight.flightOffer);

  // Save in prev bookings: 

  useEffect(() => {
    axios({
      method: "POST",
      url: 'http://localhost:5000/api/checkout',
      data: {singleFlightOffer: singleFlightOffer, returnFlightOffer: returnFlightOffer, userId: user._id, travellerInfo: travellerInfo}  
    }).then(res => {
      console.log(res);
      // console.log("Var inside: ", isSignedIn, res.data.user._id);
    }) 
      .catch(err => console.log("Error from checkout", err));
  }, [])


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
        <p>Booking Ref: FRA-BE-19283102</p>
        <p>Print your boarding pass here</p>
      </div>

      
      <Pdf targetRef={ref} filename="code-example.pdf">
        {({ toPdf }) => <button onClick={toPdf}>Generate Pdf</button>}
      </Pdf>

      <div  ref={ref}>
        <BoardingPass singleFlightOffer={singleFlightOffer} returnFlightOffer={returnFlightOffer} isReturn={isReturn}/>
      </div>

      <div  >
        <p>Boarding Pass: </p>

      </div>

      <Link to="/" className="go-home btn btn-large transparent waves-effect waves-light">
        <i class="fas fa-home"></i>   Go Home
      </Link>
    </div>
  )
}
