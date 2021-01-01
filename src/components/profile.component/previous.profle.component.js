import React, {useEffect, useState} from "react";
import axios from 'axios';
import { useSelector} from 'react-redux';


const data = [
  {
    id: 12,
    to: "DEL",
    from: "BOM",
    dep_date: "21122020",
    dep: "1230",
    arr_date: "21122020",
    arr: "1130",
    price: "10000"
  },
  {
    id: 23,
    to: "DEL",
    dep_date: "21122020",
    from: "BOM",
    dep: "1230",
    arr_date: "21122020",
    arr: "1130",
    price: "10000"
  },
  {
    id: 34,
    to: "DEL",
    dep_date: "21122020",
    from: "BOM",
    dep: "1230",
    arr_date: "21122020",
    arr: "1130",
    price: "10000"
  }
]
const PassengersInfo = (props) => {
  console.log(props.travellerInfo[0])
  return (
    <div>
      <h3>Adults:</h3>
      {
        props.travellerInfo[0].map((adult) => {
        <div> 
          <h1>{adult.fName + " " + adult.lName}</h1>
          <p>{adult.gender}</p>
          <p>{adult.ID}</p>
        </div>
        })
      }

      <h3>Children:</h3>
      {
        props.travellerInfo[1].map((children, index) => {
        <div> 
          <p>{children.fName + " " + children.lName}</p>
          <p>{children.gender}</p>
          <p>{children.ID}</p>
        </div>
        })
      }
      <h3>Contact:</h3>
      {
        props.travellerInfo[2].map((contact, index) => {
        <div> 
          <p>Phone: {contact[0]}</p>
          <p>Email: {contact[1]}</p>
        </div>
        })
      }
    </div>
  )
}

const HistoryCard = (props) => {
  const convertTime = (date) => {
    var newDate = new Date(date);
    var time = newDate.toLocaleTimeString();
    return time;
  }

  const convertDate = (startDate) => {
    return new Date(startDate).toLocaleDateString();
  }

  return (
    <div className="card-container">
      <div className="card-left">
        <h6 className="airline-no">{props.object.singleFlightOffer.itineraries[0].segments[0].carrierCode + " " + props.object.singleFlightOffer.itineraries[0].segments[0].number}</h6>
        <h6 className="pass-name">{<PassengersInfo travellerInfo={props.object.travellerInfo}/>}</h6>
      </div>
      <div className="card-mid">
        <h5 className="dep">DEPARTURE</h5>
        <div className="right-date">{convertDate(props.object.singleFlightOffer.itineraries[0].segments[0].departure.at)}</div>
        <div className="right-time">{convertTime(props.object.singleFlightOffer.itineraries[0].segments[0].departure.at)}</div>
        <div className="right-place">{props.object.singleFlightOffer.itineraries[0].segments[0].departure.iataCode}</div>
      </div>
      <div className="card-left">
        <h5 className="arr">ARRIVAL</h5>
        <div className="left-date">{convertDate(props.object.singleFlightOffer.itineraries[0].segments[0].arrival.at)}</div>
        <div className="left-time">{convertTime(props.object.singleFlightOffer.itineraries[0].segments[0].arrival.at)}</div>
        <div className="left-place">{props.object.singleFlightOffer.itineraries[0].segments[0].arrival.iataCode}</div>
      </div>
      <div className="card-price">
        <div className="total-price">{props.object.singleFlightOffer.price.grandTotal}</div>
      </div>
      {
        props.object.returnFlightOffer &&
        <div>
            <div className="card-left">
              <h6 className="airline-no">{props.object.returnFlightOffer.itineraries[0].segments[0].carrierCode + " " + props.object.returnFlightOffer.itineraries[0].segments[0].number}</h6>
            </div>
            <div className="card-mid">
              <h5 className="dep">DEPARTURE</h5>
              <div className="right-date">{convertDate(props.object.returnFlightOffer.itineraries[0].segments[0].departure.at)}</div>
              <div className="right-time">{convertTime(props.object.returnFlightOffer.itineraries[0].segments[0].departure.at)}</div>
              <div className="right-place">{props.object.returnFlightOffer.itineraries[0].segments[0].departure.iataCode}</div>
            </div>
            <div className="card-left">
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
