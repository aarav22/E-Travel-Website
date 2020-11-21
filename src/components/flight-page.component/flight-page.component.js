import Axios from "axios";
import React, {useState, useEffect} from "react";
import {Link } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import amadeusResponse from '../../testing_data/amadeusResponse.json'
import Pagination from '../pagination.component/pagination.component';
import {flightOffer} from '../flight-page.component/flightsSlice'
import "./flight-page.component.css";

// const Amadeus = require('amadeus');
const FlightPage = () => {
  const dispatch = useDispatch();
  const source = useSelector(state => state.flight.source);
  const destination = useSelector(state => state.flight.destination)

  // For Pagination: 
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);


  // const amadeus = new Amadeus({
  //   clientId: `${process.env.REACT_APP_AMADEUS_API}`,
  //   clientSecret: `${process.env.REACT_APP_AMADEUS_SECRET}`
  // });

  useEffect(() => {
    const fetchFlights = async () => {
      setLoading(true);
      const res = amadeusResponse.body;
      console.log(res.data)
      // await amadeus.shopping.flightOffersSearch.get({
      //   originLocationCode: source,
      //   destinationLocationCode: destination,
      //   departureDate: '2020-12-01',
      //   adults: '2'
      // }).then(res => console.log(res)).catch(function (responseError) {
      //   console.log(responseError, responseError.code);
      // });
      setFlights(res.data);
      setLoading(false);
    };
    fetchFlights();
  }, [flights]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentFlights = flights.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);


  // amadeus.shopping.flightOffersSearch.get({
  //   originLocationCode: source,
  //   destinationLocationCode: destination,
  //   departureDate: '2020-12-01',
  //   adults: '2'
  // }).then(function (response) {
  //   console.log(response);
  // }).catch(function (responseError) {
  //   console.log(responseError, responseError.code);
  // });

  const saveFlightOffer = (offer) => {
    dispatch(flightOffer(offer))
  }

  return (
    <div className="flight-page-container">
      <div className="flight-page-topbar">
        <input placeholder="destination"></input>
          ↔
          <input placeholder="arrival"></input>
        <div className="info">
          <h5>414 Results</h5>
          <button>Sort By</button>
        </div>
      </div>

      <div className="flight-page-main">
        <div className="flight-page-filters"></div>

        <div className="flight-page-flights"> {
          currentFlights.map((flight) => {
            return (
              <Link className="flight-card" key={flight.id} onClick={saveFlightOffer(flight)}to="/book">
                <div className="flight-card-details">
                  <div className="airline-details">
                    <svg className="airline-img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 470 470"><path d="m468.9 280c-1.4-2.3-3.8-3.6-6.4-3.6h-133.5c-4.1 0-7.5 3.4-7.5 7.5s3.4 7.5 7.5 7.5h121l-2.5 4.7c-3 5.5-14.6 11.7-25.8 11.7h-120.3c3.3-9 5.2-18.8 5.2-29.1 0-14.4-3.6-28-9.9-39.6h68.4c4.1 0 7.5-3.4 7.5-7.5s-3.4-7.5-7.5-7.5h-78.9c-7.9-8.9-17.7-15.7-28.7-19.7v-75.6c0-12-7.4-22.8-19.4-28.2-1.9-0.9-4.2-0.9-6.1 0-12 5.4-19.4 16.2-19.4 28.2v75.6c-11 4-20.8 10.8-28.7 19.7h-78.9c-4.1 0-7.5 3.4-7.5 7.5s3.4 7.5 7.5 7.5h68.4c-6.3 11.6-9.9 25.2-9.9 39.6 0 10.3 1.8 20.1 5.2 29.1h-120.3c-11.2 0-22.9-6.2-25.8-11.7l-2.5-4.7h121.1c4.1 0 7.5-3.4 7.5-7.5s-3.4-7.5-7.5-7.5h-133.6c-2.6 0-5.1 1.4-6.4 3.6-1.4 2.3-1.4 5.1-0.2 7.4l8.4 15.7c5.9 11 23 19.7 39 19.7h32.1c-2.9 4.7-4.5 10.3-4.5 16.2 0 17.2 14 31.2 31.2 31.2s31.2-14 31.2-31.2c0-5.9-1.7-11.5-4.5-16.2h42.2c12.9 20.6 34.6 34.2 59.1 34.2s46.2-13.6 59.1-34.2h42.2c-2.9 4.7-4.5 10.3-4.5 16.2 0 17.2 14 31.2 31.2 31.2s31.2-14 31.2-31.2c0-5.9-1.7-11.5-4.5-16.2h32.1c16 0 33.2-8.6 39-19.7l8.4-15.7c1.2-2.3 1.2-5.1-0.2-7.4zm-345.7 58.9c0 8.9-7.3 16.2-16.2 16.2s-16.2-7.3-16.2-16.2 7.3-16.2 16.2-16.2 16.2 7.3 16.2 16.2zm104.2-210.2c0-5 2.8-9.7 7.5-12.8 4.7 3.1 7.5 7.8 7.5 12.8v72c-2.5-0.3-5-0.4-7.5-0.4s-5 0.2-7.5 0.4v-72zm7.5 213.1c-31.2 0-56.5-28.4-56.5-63.3s25.4-63.3 56.5-63.3 56.5 28.4 56.5 63.3-25.4 63.3-56.5 63.3zm144.2-3c0 8.9-7.3 16.2-16.2 16.2s-16.2-7.3-16.2-16.2 7.3-16.2 16.2-16.2 16.2 7.3 16.2 16.2z" /><path d="m264.2 250.2h-58.4c-4.1 0-7.5 3.4-7.5 7.5 0 4.1 3.4 7.5 7.5 7.5h58.4c4.1 0 7.5-3.4 7.5-7.5 0-4.1-3.4-7.5-7.5-7.5z" /></svg>
                    <p className="airline-name">{flight.itineraries[0].segments[0].carrierCode + " " + flight.itineraries[0].segments[0].aircraft.code}</p>
                  </div>
                  <div className="flight-details">
                    <div className="flight-rating">{flight.itineraries[0].segments[0].numberOfStops}</div>
                    <div className="flight-timings">
                      <span className="flight-timing-dep">{flight.itineraries[0].segments[0].departure.at}</span>
                      <span className="line"></span>
                      <span className="flight-timing-arr">{flight.itineraries[0].segments[0].arrival.at}</span>
                    </div>
                    <div className="flight-duration">{flight.duration}</div>
                  </div>
                </div>
                <div className="flight-card-price">
                  <div className="flight-rating">{flight.price.total}</div>
                </div>
              </Link>
            )
          })
        }
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={flights.length}
            paginate={paginate} />
        </div>
      </div>
    </div>
  )
}

export default FlightPage;
