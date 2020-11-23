import Axios from "axios";
import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import amadeusResponse from '../../testing_data/amadeusResponse.json'
import Pagination from '../pagination.component/pagination.component';
import {flightOffer} from '../flight-page.component/flightsSlice'
import "./flight-page.component.css";

// const Amadeus = require('amadeus');
const FlightPage = () => {
  const dispatch = useDispatch();
  // const source = useSelector(state => state.flight.source);
  // const destination = useSelector(state => state.flight.destination);
  // const date = useSelector(state => state.flight.date);
  // const returnDate = useSelector(state => state.flight.returnDate);
  // const numAdults = useSelector(state => state.flight.numAdults);
  const flightItineary = useSelector(state => state.flight.userinfoObject);

  // Filters:
  const [maxPrice, setMaxPrice] = useState(''); // This will be an integer >= 0
  const [excludedAirlineCodes, setExculdedFlights] = useState('') // this will be a string of exculded airline codes separated by comma
  const [includedAirlineCodes, setIncludedFlights] = useState('') // this will be a string of included airline codes separated by comma
  const [isNonStop, setNonStop] = useState(false);

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
      //   originLocationCode: flightItineary.source,
      //   destinationLocationCode: flightItineary.destination,
      //   departureDate: flightItineary.date,
      //   adults: flightItineary.numAdults,
      //   infants: flightItineary.numInfants,
      //   currencyCode: "INR",
      //   nonStop: isNonStop,
      //   includedAirlineCodes: includedAirlineCodes,
      //   excludedAirlineCodes: excludedAirlineCodes,
      //   maxPrice:maxPrice, 
      // }).then(res => console.log(res)).catch(responseError => 
      //   console.log(responseError, responseError.code));
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

  const saveFlightOffer = (offer) => {
    dispatch(flightOffer(offer))
  }

  return (
    <div className="flight-page-container">
      <div className="flight-page-topbar">
        <div className="locs">
          <div className="departure">
            DEL
          </div>
          <div className="arrival">
            BOM
          </div>
        </div>
        <div className="info">
          <h5>414 Results</h5>
          <button>Sort By</button>
        </div>
      </div>

      <div className="flight-page-filters">
        Max Price
        Only These
        Except These
      </div>

      <div className="flight-page-flights"> {
        currentFlights.map((flight) => {
          return (
            <Link className="flight-card" key={flight.id} onClick={saveFlightOffer(flight)} to="/book">
              <div className="flight-card-details">
                <div className="airline-details">
                  <p className="airline-name">{flight.itineraries[0].segments[0].carrierCode + " " + flight.itineraries[0].segments[0].aircraft.code}</p>
                </div>
                <div className="flight-details">
                  <div className="flight-timings">
                    <div className="flight-timing-dep">
                      <div className="timing-dep">{"21:00"}</div>
                      <p>{"DEL"}</p>
                    </div>
                    <div className="timing-dur">1h 35 mins</div>
                    <div className="flight-timing-arr">
                      <div className="timing-arr">{"22:35"}</div>
                      <p>{"BOM"}</p>
                    </div>
                  </div>
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
  )
}

export default FlightPage;
