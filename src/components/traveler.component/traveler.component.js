import React from "react";
import {useSelector} from "react-redux";
import "./traveler.component.css"


const Traveller = () => {
  const user_info = useSelector(state => state.flight.userinfoObject)

  const no_adults = [...new Array(user_info.numAdults)].map((_, i) => `adult-${i}`);
  const no_kids = [...new Array(user_info.numInfants)].map((_, i) => `kid-${i}`);

  return (
    <div className="traveler-container">
      <h4 className="traveler-title">Traveller Details</h4>
      <div className="traveler-adult">
        <h6>ADULT</h6>
        {no_adults.map((e) => (
          <form key={`${e}`} name={`${e}`} className={`traveler ${e}-forms`}>
            <div className="input-field col s3">
              <input type="text" className="validate" id={`first-name-${e}`} />
              <label for={`first-name-${e}`}>First Name</label>
            </div>

            <div className="input-field col s3">
              <input type="text" className="validate" id={`last-name-${e}`} />
              <label for={`last-name-${e}`}>Last Name</label>
            </div>

            <div className="input-field col s3">
              <input type="text" className="validate" id={`gender-${e}`} />
              <label for={`gender-${e}`}>Gender</label>
            </div>

            <div className="input-field col s3">
              <input type="text" className="validate" id={`id-${e}`} />
              <label for={`id-${e}`}>ID Authorization</label>
            </div>
          </form>
        ))
        }
      </div>
      <div className="traveler-child">
        <h6>CHILD</h6>
        {no_kids.map((e) => (
          <div>
            <form key={`${e}`} name={`${e}`} className={`traveler ${e}-forms`}>
              <div className="input-field col s3">
              <input type="text" className="validate" id={`first-name-${e}`} />
              <label for={`first-name-${e}`}>First Name</label>
              </div>

              <div className="input-field col s3">
              <input type="text" className="validate" id={`last-name-${e}`} />
              <label for={`last-name-${e}`}>Last Name</label>
              </div>

              <div className="input-field col s3">
              <input type="text" className="validate" id={`gender-${e}`} />
              <label for={`gender-${e}`}>Gender</label>
              </div>

              <div className="input-field col s3">
              <input type="text" className="validate" id={`id-${e}`} />
              <label for={`id-${e}`}>ID Authorization</label>
              </div>
          </form>
          </div>
        ))
        }
      </div>
      <div className="contact-info">
        <h6>CONTACT DETAILS</h6>
        <form name="contact" className="traveler contact-forms">
          <div className="input-field col s6">
            <input type="text" className="validate" id="mobile" />
            <label for="mobile">Mobile No</label>
          </div>
          <div className="input-field col s6">
            <input type="text" className="validate" id="email" />
            <label for="email">Email</label>
          </div>
        </form>
      </div>
      <div className="continue-btn">
        <button className="btn-large transparent waves-effect traveler-continue">CONTINUE</button>
      </div>
    </div>
  )
}


export default Traveller;
