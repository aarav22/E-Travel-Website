import React from "react";
import {Link} from "react-router-dom";
import {useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import FinalComponent from '../successful.component/successful.component'
import {FormControl, FormControlLabel, RadioGroup, Radio} from "@material-ui/core";
import "./booking.component.css";

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
          <span className="img code"></span>
          <h6>{props.singleFlightOffer.itineraries[0].segments[0].carrierCode + " " + props.singleFlightOffer.itineraries[0].segments[0].aircraft.code}</h6>
        </div>
        <div className="book-mid-right">
          <div className="book-mid-dep">
            <div className="mid-time time">{convertTime(props.singleFlightOffer.itineraries[0].segments[0].departure.at)}</div>
            <div className="mid-date">{convertDate(props.singleFlightOffer.itineraries[0].segments[0].departure.at)}</div>
            <div className="mid-dep">{props.singleFlightOffer.itineraries[0].segments[0].departure.iataCode}</div>
            {console.log(props)}
            <div className="mid-term">{`Terminal: ${props.singleFlightOffer.itineraries[0].segments[0].departure.terminal ? props.singleFlightOffer.itineraries[0].segments[0].departure.terminal : "NA"}`}</div>
          </div>
          {
            props.singleFlightOffer.itineraries[0].segments.map((item) => {
              return (
                <div style={{display: "flex", gap: "1rem"}}>
                  <div className="book-mid-time"><p>{item.duration}</p></div>
                  <div className="book-mid-arr">
                    <div className="mid-time time">{convertTime(item.arrival.at)}</div>
                    <div className="mid-date">{convertDate(item.arrival.at)}</div>
                    <div className="mid-dep">{item.arrival.iataCode}</div>
                    <div className="mid-term">{`Terminal: ${item.arrival.terminal ? item.arrival.terminal : "NA"}`}</div>
                  </div>
                </div>
              )
            })
          }
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
              <div className="mid-term">{`Terminal: ${props.returnFlightOffer.itineraries[0].segments[0].departure.terminal ? props.returnFlightOffer.itineraries[0].segments[0].departure.terminal : "NA"}`}</div>
            </div>
            {
              props.returnFlightOffer.itineraries[0].segments.map((item) => {
                return (
                  <div style={{display: "flex", gap: "1rem"}}>
                    <div className="book-mid-time"><p>{item.duration}</p></div>
                    <div className="book-mid-arr">
                      <div className="mid-time time">{convertTime(item.arrival.at)}</div>
                      <div className="mid-date">{convertDate(item.arrival.at)}</div>
                      <div className="mid-dep">{item.arrival.iataCode}</div>
                      <div className="mid-term">{`Terminal: ${item.arrival.terminal ? item.arrival.terminal : "NA"}`}</div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      )}
      <div className="book-bottom">
        <p>Mandatory check-list for passengers (in lieu of COVID-19):</p>
        <p>➡ Certify your health status through the Aarogya Setu app or the self-declaration form at the airport.</p>
        <p>➡ Remember to web check-in before arriving at the airport; carry a printed or soft copy of the boarding pass.</p>
        <p>➡ Please reach at least 2 hours prior to flight departure.</p>
        <p>➡ Please wear a robber's mask.</p>
        <p>➡ PPE kits will be provided and are compulsorily to be used.</p>
      </div>
    </div>
  );
}




const DisplayReview = () => {
  const [discount, setDiscount] = useState(0);
  const [valRadioSingle, setRadioSingle] = useState('')
  const singleFlightOffer = useSelector(state => state.flight.singleFlightOffer);
  const returnFlightOffer = useSelector(state => state.flight.returnFlightOffer);
  var isReturn = false;
  if (returnFlightOffer) {
    isReturn = true;
  }

  return (
    <div className="booking-container">
      <div className="booking-title">
        Review Your Booking
      </div>
      <div className="booking-main">
        <BoardingPass singleFlightOffer={singleFlightOffer} returnFlightOffer={returnFlightOffer} isReturn={isReturn} />
        <div className="book-main-right">
          <div className="order-title fare"><p>FARE SUMMARY</p></div>
          <div className="order-details">
            <table>
              <tbody>
                <tr>
                  <td className="order-price">Base Fare</td>
                  <td className="order-price">{"₹" + singleFlightOffer.price.total}</td>
                </tr>
                <tr>
                  <td className="order-price">Surcharges</td>
                  <td className="order-price">{"₹" + 500}</td>
                </tr>
                <tr>
                  <td className="order-price">Discount</td>
                  <td className="order-price">{"₹" + discount}</td>
                </tr>
                <tr>
                  <td className="order-price">Total Amount</td>
                  <td className="order-price">{"₹" + (parseFloat(singleFlightOffer.price.total) + 500 - discount)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="booking-cancel-message">
            <h6 className="book-top">HOT DEALS</h6>
            <FormControl component="fieldset">
              <RadioGroup name="coupon" value={valRadioSingle} className="book-text">
                <FormControlLabel value="cs1208" control={<Radio onChange={(e) => {setDiscount(1208); setRadioSingle(e.target.value);}} />} label="CS-1208 - That okay?" />
                <FormControlLabel value="cs1216" control={<Radio onChange={(e) => {setDiscount(1216); setRadioSingle(e.target.value);}} />} label="CS-1216 - Correct..but not exactly" />
                <FormControlLabel value="cs1202" control={<Radio onChange={(e) => {setDiscount(1202); setRadioSingle(e.target.value);}} />} label="CS-1202 - best professor" />
              </RadioGroup>
            </FormControl>
          </div>

          <div className="booking-coupon">
            Note: 
            Cancellation & Date change charges
            Cancellation Fees Apply
            A penalty of upto ₹ 3,450 will be charged by the airline & by Wright based on how close to the departure date you cancel.
          </div>
          <Link className="booking-button btn-large waves-effect transparent" to='/traveller'>
            CONTINUE
          </Link>
        </div>
      </div>
    </div>
  )
}


export default DisplayReview;
