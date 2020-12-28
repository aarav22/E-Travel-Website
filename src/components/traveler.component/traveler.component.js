import React from "react";
import "./traveler.component.css"

const Traveller = () => {
  return (
    <div className="traveler-container">
      <p className="trveler-title">Traveller Details</p>
      <div className="traveler-adult">
        <h6>ADULT</h6>
        <div className="traveler-adult-forms"></div>
      </div>
      <div className="traveler-child">
        <h6>CHILD</h6>
        <div className="traveler-child-forms"></div>
      </div>
      <div className="contact-info">
        <h6>CONTACT DETAILS</h6>
        <div className="traveler-contact-forms"></div>
      </div>
      <button className="traveler-continue">CONTINUE</button>
    </div>
  )
}


export default Traveller;
