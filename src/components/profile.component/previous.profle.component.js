import React, {useEffect, useState} from "react";
import axios from 'axios';
import {useSelector} from 'react-redux';


const PassengersInfo = (props) => {
  console.log(props.travellerInfo[0])
  return (
    <div>
      <h6>Adults:</h6>
      {
        props.travellerInfo[0].map((adult) =>
          <div>
            <p>{adult.fName + " " + adult.lName}</p>
            <p>{adult.gender}</p>
            <p>{adult.ID}</p>
          </div>
        )
      }

      <h6>Children:</h6>
      {
        props.travellerInfo[1].map((children, _) =>
          <div>
            <p>{children.fName + " " + children.lName}</p>
            <p>{children.gender}</p>
            <p>{children.ID}</p>
          </div>
        )
      }
      <h6>Contact:</h6>
      {
        props.travellerInfo[2].map((contact, _) =>
          <div>
            <p>Phone: {contact[0]}</p>
            <p>Email: {contact[1]}</p>
          </div>
        )
      }
    </div>
  )
}

const HistoryCard = (props) => {

  const [cardOpen, setCardOpen] = useState(false);

  const convertTime = (date) => {
    var newDate = new Date(date);
    var time = newDate.toLocaleTimeString();
    return time;
  }

  const convertDate = (startDate) => {
    return new Date(startDate).toLocaleDateString();
  }

  return (
    <div className={`card-container ${cardOpen ? "lg" : "sm"} ${props.object.returnFlightOffer ? "return" : ""}`}>
      <div className="kuch-bhi">
        <div className="one">
          <div className="card-left">
            <h6 className="airline-no">{props.object.singleFlightOffer.itineraries[0].segments[0].carrierCode + " " + props.object.singleFlightOffer.itineraries[0].segments[0].number}</h6>
          </div>
          <div className="card-mid">
            <h5 className="dep">DEPARTURE</h5>
            <div className="right-date">{convertDate(props.object.singleFlightOffer.itineraries[0].segments[0].departure.at)}</div>
            <div className="right-time">{convertTime(props.object.singleFlightOffer.itineraries[0].segments[0].departure.at)}</div>
            <div className="right-place">{props.object.singleFlightOffer.itineraries[0].segments[0].departure.iataCode}</div>
          </div>
          <div className="card-right">
            <h5 className="arr">ARRIVAL</h5>
            <div className="left-date">{convertDate(props.object.singleFlightOffer.itineraries[0].segments[0].arrival.at)}</div>
            <div className="left-time">{convertTime(props.object.singleFlightOffer.itineraries[0].segments[0].arrival.at)}</div>
            <div className="left-place">{props.object.singleFlightOffer.itineraries[0].segments[0].arrival.iataCode}</div>
          </div>
          <div className="card-price">
            <div className="total-price">{props.object.singleFlightOffer.price.grandTotal}</div>
            <button className="card-btn" onClick={() => {setCardOpen(!cardOpen)}}><i className={`fas fa-angle-down fa-2x `} ></i></button>
          </div>
        </div>
        {
          props.object.returnFlightOffer &&
          <div className="two">
            <div className="card-left">
              <h6 className="airline-no">{props.object.returnFlightOffer.itineraries[0].segments[0].carrierCode + " " + props.object.returnFlightOffer.itineraries[0].segments[0].number}</h6>
            </div>
            <div className="card-mid">
              <h5 className="dep">DEPARTURE</h5>
              <div className="right-date">{convertDate(props.object.returnFlightOffer.itineraries[0].segments[0].departure.at)}</div>
              <div className="right-time">{convertTime(props.object.returnFlightOffer.itineraries[0].segments[0].departure.at)}</div>
              <div className="right-place">{props.object.returnFlightOffer.itineraries[0].segments[0].departure.iataCode}</div>
            </div>
            <div className="card-right">
              <h5 className="arr">ARRIVAL</h5>
              <div className="left-date">{convertDate(props.object.returnFlightOffer.itineraries[0].segments[0].arrival.at)}</div>
              <div className="left-time">{convertTime(props.object.returnFlightOffer.itineraries[0].segments[0].arrival.at)}</div>
              <div className="left-place">{props.object.returnFlightOffer.itineraries[0].segments[0].arrival.iataCode}</div>
            </div>
            <div className="card-price">
              <div className="total-price">{props.object.returnFlightOffer.price.grandTotal}</div>
            </div>
          </div>
        }
      </div>
      <h6 className="pass-name">{<PassengersInfo travellerInfo={props.object.travellerInfo} />}</h6>
    </div>

  )
}


const Previous = () => {
  const [history, setHistory] = useState([]);
  const userProfile = useSelector(state => state.user.curr_user)
  useEffect(() => {
    axios({
      method: "GET",
      url: 'http://localhost:5000/api/get_history',
      params: {user_id: userProfile._id}
    }).then(res => {
      console.log(res);
      setHistory(res.data.history);
    })
      .catch(err => console.log("Error from order history", err));
  }, []);

  return (
    <div className="previous-container">
      {
        history.map((item, index) =>
          <HistoryCard object={item} key={index}></HistoryCard>
        )
      }
    </div>
  )
}

export default Previous;
