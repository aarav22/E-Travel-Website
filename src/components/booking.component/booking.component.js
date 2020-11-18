import React from "react";

import "./booking.component.css";


const Booking = () => {

  return (
    <div className="booking-main">
      <div className="booking-info">
        Review Your Booking
      </div>
      <div className="booking-main">
        <div className="book-main-left">
          <div className="book-top"></div>
          <div className="book-mid">
            <div className="mook-mid-left">
              <span className="img">IMG</span>
              <h6>Air India</h6>
              <p>AI-803</p>
            </div>
            <div className="mook-mid-center">
              <div className="book-mid-dep">
                17:35
                Fri, 20 Nov 20
                New Delhi
                Indira Gandhi International Airport
                Terminal 3
            </div>
              <div className="book-mid-arr">
                08:20
                Fri, 20 Nov 20
                Bengaluru
                Bengaluru International Airport
            </div>
            </div>
            <div className="mook-mid-right"></div>
          </div>
          <div className="book-bottom"></div>
        </div>
        <div className="book-main-right">
          <div className="order-details">
            Fare Summary

            Base Fare

            ₹ 5,330
            Fee & Surcharges

            ₹ 725
            Other Services

            ₹ 10
            Total Amount:
            ₹ 6,065
          </div>
          <div>
            Cancellation & Date change charges
            Cancellation Fees Apply
            A penalty of upto ₹ 3,450 will be charged by the airline & by MMT based on how close to the departure date you cancel.
          </div>

        </div>
      </div>
    </div>
  )
}

export default Booking;
