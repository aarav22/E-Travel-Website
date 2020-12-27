import React from "react";
import {Link} from "react-router-dom";

import "./booking.component.css";

const Booking = () => {

  return (
    <div className="booking-container">
      <div className="booking-title">
        Review Your Booking
      </div>

      <div className="booking-main">
        <div className="book-main-left">
          <div className="book-top">ITINERARY</div>
          <div className="book-mid">
            <div className="mook-mid-left">
              <span className="img"></span>
              <h6>Vistara</h6>
              <p>AI-803</p>
            </div>
            <div className="book-mid-right">
              <div className="book-mid-dep">
                <div className="mid-time">17:35</div>
                <div className="mid-date">Fri, 20 Nov 20</div>
                <div className="mid-dep">New Delhi</div>
                <div className="mid-port">Indira Gandhi International Airport</div>
                <div className="mid-term">Terminal 3</div>
              </div>
              <div className="book-mid-time"><p>1h 35mins</p></div>
              <div className="book-mid-arr">
                <div className="mid-time">08:20</div>
                <div className="mid-date">Fri, 20 Nov 20</div>
                <div className="mid-dep">Bengaluru</div>
                <div className="mid-port">Bengaluru International Airport</div>
                <div className="mid-term">Terminal 5</div>
              </div>
            </div>
          </div>
          <div className="book-bottom">
            <p>Mandatory check-list for passengers (in lieu of COVID-19):</p>
            <p>➡ Certify your health status through the Aarogya Setu app or the self-declaration form at the airport.</p>
            <p>➡ Remember to web check-in before arriving at the airport; carry a printed or soft copy of the boarding pass.</p>
            <p>➡ Please reach at least 2 hours prior to flight departure.</p>
            <p>➡ Wear a f✳cking mask.</p>
            <p>➡ PPE kits will be provided and are compulsory to be used.</p>
          </div>
        </div>
        <div className="book-main-right">
          <div className="order-title"><p>FARE SUMMARY</p></div>
          <div className="order-details">
            <table>
              <tr>
                <td>Base Fare</td>
                <td className="order-price">{"₹" + 2000}</td>
              </tr>
              <tr>
                <td>Surcharges</td>
                <td className="order-price">{"₹" + 500}</td>
              </tr>
              <tr>
                <td>Total Amount</td>
                <td className="order-price">{"₹" + 2500}</td>
              </tr>
            </table>
          </div>
          <div className="booking-coupon">
            Cancellation & Date change charges
            Cancellation Fees Apply
            A penalty of upto ₹ 3,450 will be charged by the airline & by Wright based on how close to the departure date you cancel.
          </div>

          <Link to='/successful'>
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
