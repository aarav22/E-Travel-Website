import React from "react";
import {Link} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import jsPDF from 'jspdf'
import FinalComponent from '../successful.component/successful.component'

const ref = React.createRef();
import {useDispatch, useSelector} from 'react-redux';


import "./booking.component.css";

const Booking = () => {
  const dispatch = useDispatch();
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
  const singleFlightOffer = useSelector(state => state.flight.singleFlightOffer);
  const returnFlightOffer = useSelector(state => state.flight.returnFlightOffer);
  const numBooking = useSelector(state => state.flight.numBookings);
  var isReturn = false;
  if (returnFlightOffer) {
    isReturn = true;
  }

  return (
    

    <div className="booking-container">

      <div className="booking-title">
        Review Your Booking
      </div>

      <div ref={ref} className="booking-main">
        <div className="book-main-left">
          <div className="book-top">ITINERARY</div>
          <div className="book-mid up">
            <div className="mook-mid-left">
              <span className="img"></span>
              <h6>{singleFlightOffer.itineraries[0].segments[0].carrierCode + " " + singleFlightOffer.itineraries[0].segments[0].aircraft.code}</h6>
              <p>AI-803</p>
            </div>
            <div className="book-mid-right">
              <div className="book-mid-dep">
                <div className="mid-time">{convertTime(singleFlightOffer.itineraries[0].segments[0].departure.at)}</div>
                <div className="mid-date">{convertDate(singleFlightOffer.itineraries[0].segments[0].departure.at)}</div>
                <div className="mid-dep">{singleFlightOffer.itineraries[0].segments[0].departure.iataCode}</div>
                <div className="mid-term">{`Terminal: ${singleFlightOffer.itineraries[0].segments[0].departure.terminal}`}</div>
              </div>
              <div className="book-mid-time"><p>1h 35mins</p></div>
              <div className="book-mid-arr">
                <div className="mid-time">{convertTime(singleFlightOffer.itineraries[0].segments[0].arrival.at)}</div>
                <div className="mid-date">{convertDate(singleFlightOffer.itineraries[0].segments[0].arrival.at)}</div>
                <div className="mid-dep">{singleFlightOffer.itineraries[0].segments[0].arrival.iataCode}</div>
                <div className="mid-term">{`Terminal: ${singleFlightOffer.itineraries[0].segments[0].arrival.terminal}`}</div>
              </div>
            </div>
          </div>
          {isReturn && (

            <div className="book-mid down">
              <div className="mook-mid-left">
                <span className="img"></span>
                <h6>{singleFlightOffer.itineraries[0].segments[0].carrierCode + " " + singleFlightOffer.itineraries[0].segments[0].aircraft.code}</h6>
              </div>
              <div className="book-mid-right">
                <div className="book-mid-dep">
                  <div className="mid-time">{convertTime(returnFlightOffer.itineraries[0].segments[0].departure.at)}</div>
                  <div className="mid-date">{convertDate(returnFlightOffer.itineraries[0].segments[0].departure.at)}</div>
                  <div className="mid-dep">{returnFlightOffer.itineraries[0].segments[0].departure.iataCode}</div>
                  <div className="mid-term">{`Terminal: ${returnFlightOffer.itineraries[0].segments[0].departure.terminal}`}</div>
                </div>
                <div className="book-mid-time"><p>1h 35mins</p></div>
                <div className="book-mid-arr">
                  <div className="mid-time">{convertTime(returnFlightOffer.itineraries[0].segments[0].arrival.at)}</div>
                  <div className="mid-date">{convertDate(returnFlightOffer.itineraries[0].segments[0].arrival.at)}</div>
                  <div className="mid-dep">{returnFlightOffer.itineraries[0].segments[0].arrival.iataCode}</div>
                  <div className="mid-term">{`Terminal: ${returnFlightOffer.itineraries[0].segments[0].arrival.terminal}`}</div>
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
        <div className="book-main-right">
          <div className="order-title"><p>FARE SUMMARY</p></div>
          <div className="order-details">
            <table>
              <tr>
                <td>Base Fare</td>
                <td className="order-price">{"₹" + singleFlightOffer.price.total}</td>
              </tr>
              <tr>
                <td>Surcharges</td>
                <td className="order-price">{"₹" + 500}</td>
              </tr>
              <tr>
                <td>Total Amount</td>
                <td className="order-price">{"₹" + (singleFlightOffer.price.total + 500)}</td>
              </tr>
            </table>
          </div>
          <div className="booking-coupon">
            Cancellation & Date change charges
            Cancellation Fees Apply
            A penalty of upto ₹ 3,450 will be charged by the airline & by Wright based on how close to the departure date you cancel.
          </div>

          <Link to='/traveller'>
            <button >
              Ka-Ching!
            </button>
          </Link>

        </div>
      </div>
    </div>
  )
}

export default Booking;
