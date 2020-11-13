import React from "react";

import "./flight-page.component.css";


const data = [
  {
    "craftCode": "320",
    "departure": "Delhi",
    "arrival": "Ahmedabad",
    "price": "₹5,100"
  }
]


const FlightPage = () => {

  return (
    <div className="flight-page-container">
      Flights from this to that
    </div>
  )
}

export default FlightPage;
