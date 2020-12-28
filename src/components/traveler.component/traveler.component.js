import React from "react";
import "./traveler.component.css"

const Traveller = () => {
  return (
    <div className="traveler-container">
      <p className="trveler-title">Traveller Details</p>
      <div className="traveler-adult">
        <h6>ADULT</h6>
        <div className="row traveler-adult-forms">
          <div className="input-field col s3">
            <input type="text" className="validate" id="first_name" />
            <label for="first_name">First Name</label>
          </div>

          <div className="input-field col s3">
            <input type="text" className="validate" id="last_name" />
            <label for="last_name">Last Name</label>
          </div>

          <div className="input-field col s3">
            <input type="text" className="validate" id="gender" />
            <label for="gender">Gender</label>
          </div>

          <div className="input-field col s3">
            <input type="text" className="validate" id="id_auth" />
            <label for="id_auth">ID Authorisation</label>
          </div>
        </div>
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
