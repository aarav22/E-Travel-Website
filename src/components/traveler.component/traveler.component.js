import React, {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import {travellersInfo} from '../flight-page.component/flightsSlice'
import "./traveler.component.css"
import "../booking.component/booking.component.css";



const Traveller = () => {
  const dispatch = useDispatch();
  const user_info = useSelector(state => state.flight.userinfoObject)
  const no_adults = [...new Array(user_info.numAdults)].map((_, i) => `adult-${i}`);
  const no_kids = [...new Array(user_info.numInfants)].map((_, i) => `kid-${i}`);

  var travellers = [];
  var adultsInfo = [];
  var childsInfo = [];
  var contactInfo = [];

  const [aFName, setAFName] = useState("");
  const [aLName, setALName] = useState("");
  const [aGender, setAGender] = useState("");
  const [aID, setAID] = useState("");

  const [cFName, setCFName] = useState("");
  const [cLName, setCLName] = useState("");
  const [cGender, setCGender] = useState("");
  const [cID, setCID] = useState("");

  const [mobile, setMobile] = useState()
  const [email, setEmail] = useState("")

  const pushAdultInfo = () => {
    var adult = {fName: aFName, lName: aLName, Gender: aGender, ID: aID};
    adultsInfo.push(adult);
  }

  const pushChildInfo = () => {
    var child = {fName: cFName, lName: cLName, Gender: cGender, ID: cID};
    childsInfo.push(child);
  }

  const finalSubmission = () => {
    contactInfo.push(mobile);
    contactInfo.push(email);
    travellers.push(adultsInfo);
    travellers.push(childsInfo);
    travellers.push(contactInfo);
    dispatch(travellersInfo(travellers));
  }

  return (
    <div className="traveler-container">
      <h4 className="traveler-title">Traveller Details</h4>
      <div className="traveler-adult">
        <h6 className="adult">ADULT</h6>
        {no_adults.map((e) => (
          <form key={`${e}`} name={`${e}`} className={`traveler ${e}-forms`}>
            <div className="input-field col s3">
              <input type="text" className="validate" id={`first-name-${e}`} value={aFName} onChange={(e) => setAFName(e.target.value)} />
              <label for={`first-name-${e}`}>First Name</label>
            </div>

            <div className="input-field col s3">
              <input type="text" className="validate" id={`last-name-${e}`} value={aLName} onChange={(e) => setALName(e.target.value)} />
              <label for={`last-name-${e}`}>Last Name</label>
            </div>

            <div className="input-field col s3">
              <input type="text" className="validate" id={`gender-${e}`} value={aGender} onChange={(e) => setAGender(e.target.value)} />
              <label for={`gender-${e}`}>Gender</label>
            </div>

            <div className="input-field col s3">
              <input type="text" className="validate" id={`id-${e}`} value={aID} onChange={(e) => setAID(e.target.value)} />
              <label for={`id-${e}`}>ID Authorization</label>
            </div>

            {pushAdultInfo()}

          </form>
        ))
        }
      </div>
      <div className="traveler-child">
        {no_kids && (<h6>CHILD</h6>)}
        {no_kids.map((e) => (
          <div>
            <form key={`${e}`} name={`${e}`} className={`traveler ${e}-forms`}>
              <div className="input-field col s3">
                <input type="text" className="validate" id={`first-name-${e}`} value={cFName} onChange={(e) => setCFName(e.target.value)} />
                <label for={`first-name-${e}`}>First Name</label>
              </div>

              <div className="input-field col s3">
                <input type="text" className="validate" id={`last-name-${e}`} value={cLName} onChange={(e) => setCLName(e.target.value)} />
                <label for={`last-name-${e}`}>Last Name</label>
              </div>

              <div className="input-field col s3">
                <input type="text" className="validate" id={`gender-${e}`} value={cGender} onChange={(e) => setCGender(e.target.value)} />
                <label for={`gender-${e}`}>Gender</label>
              </div>

              <div className="input-field col s3">
                <input type="text" className="validate" id={`id-${e}`} value={cID} onChange={(e) => setCID(e.target.value)} />
                <label for={`id-${e}`}>ID Authorization</label>
              </div>
              {pushChildInfo()}
            </form>
          </div>
        ))
        }
      </div>
      <div className="contact-info">
        <h6>CONTACT DETAILS</h6>
        <form name="contact" className="traveler contact-forms">
          <div className="input-field col s6">
            <input type="tel" className="validate" id="mobile" value={mobile} onChange={(e) => {setMobile(e.target.value)}} />
            <label for="mobile">Mobile No</label>
          </div>
          <div className="input-field col s6">
            <input type="email" className="validate" id="email" value={email} onChange={(e) => {setEmail(e.target.value)}} />
            <label for="email">Email</label>
          </div>
        </form>
      </div>

      <div className="continue-btn">
        <Link to='/successful'>
          {finalSubmission()}
          <button className="btn-large transparent waves-effect traveler-continue">CONTINUE</button>
        </Link>
      </div>
    </div>
  )
}


export default Traveller;
