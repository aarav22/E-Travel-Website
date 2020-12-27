import Axios from "axios";
import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import amadeusResponse from '../../testing_data/amadeusResponse.json'
import PaginationComponent from '../pagination.component/pagination.component';
import {flightOffer} from '../flight-page.component/flightsSlice'
import InputSlider from './slider-input'
import {RadioGroup, FormControlLabel, Radio, FormControl, Button, makeStyles} from '@material-ui/core';

// import "./flight-page.component.css";
import "./flight-page.component-material.css";

const useStyles = makeStyles({
  radio: {
    color: "white"
  }
});
// const Amadeus = require('amadeus');
const FlightPage = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const source = useSelector(state => state.flight.source);
  const destination = useSelector(state => state.flight.destination);
  const date = useSelector(state => state.flight.date);
  const returnDate = useSelector(state => state.flight.returnDate);
  const numAdults = useSelector(state => state.flight.numAdults);
  const flightItineary = useSelector(state => state.flight.userinfoObject);

  // Filters:
  const [maxPrice, setMaxPrice] = useState(''); // This will be an integer >= 0
  const [tempMaxPrice, setTempMaxPrice] = useState(''); //storing until user hits go


  const [excludedAirlineCodes, setExcludedFlights] = useState('') // this will be a string of exculded airline codes separated by comma
  const [includedAirlineCodes, setIncludedFlights] = useState('') // this will be a string of included airline codes separated by comma
  const [isNonStop, setNonStop] = useState(false);
  const [clickOnly, setClickOnly] = useState(false);
  const [clickExcept, setClickExcept] = useState(false);

  // For Pagination: 
  const [flights, setFlights] = useState([]);
  const [returnFlights, setReturnFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const [airlinesObject, setAirlinesObject] = useState(null); // For filter dictionary
  const [airlinesList, setAirlinesList] = useState([]);

  // Used when radio buttons are checked: 
  const [singleFlightOffer, setSingleFlightOffer] = useState('');
  const [valRadioSingle, setRadioSingle] = useState('');
  const [returnFlightOffer, setReturnFlightOffer] = useState('');
  const [valRadioReturn, setRadioReturn] = useState('');


  // const amadeus = new Amadeus({
  //   clientId: `${process.env.REACT_APP_AMADEUS_API}`,
  //   clientSecret: `${process.env.REACT_APP_AMADEUS_SECRET}`
  // });

  const includedFlightsHandler = (flightCode) => {
    if (includedAirlineCodes) {
      setIncludedFlights(includedAirlineCodes + "," + flightCode);
    } else {
      setIncludedFlights(flightCode)
    }
  }

  const excludedFlightsHandler = (flightCode) => {
    if (excludedAirlineCodes) {
      setExcludedFlights(excludedAirlineCodes + "," + flightCode);
    } else {
      setExcludedFlights(flightCode)
    }
  }

  useEffect(() => {
    const fetchFlights = async () => {
      setLoading(true);
      // console.log(amadeusResponse.body)
      const res = amadeusResponse;
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
      setAirlinesObject(res.dictionaries.carriers);
      setFlights(res.data);
      setLoading(false);
    };
    fetchFlights();
  }, [flights]);


  useEffect(() => {
    if (props.location.isRoundTrip) {
      const fetchReturnFlights = async () => {
        setLoading(true);
        // console.log(amadeusResponse.body)
        const res = amadeusResponse;
        console.log(res.data)
        // await amadeus.shopping.flightOffersSearch.get({
        //   originLocationCode: flightItineary.destination,
        //   destinationLocationCode: flightItineary.source,
        //   departureDate: flightItineary.returnDate,
        //   adults: flightItineary.numAdults,
        //   infants: flightItineary.numInfants,
        //   currencyCode: "INR",
        //   nonStop: isNonStop,
        //   includedAirlineCodes: includedAirlineCodes,
        //   excludedAirlineCodes: excludedAirlineCodes,
        //   maxPrice:maxPrice, 
        // }).then(res => console.log(res)).catch(responseError => 
        //   console.log(responseError, responseError.code));
        setReturnFlights(res.data);
        setLoading(false);
      };
      fetchReturnFlights();
    }
  }, [returnFlights]);

  useEffect(() => {
    let newList = [];
    if (airlinesObject) {
      Object.keys(airlinesObject).forEach((key, i) => {
        newList.push(key);
      })
      setAirlinesList(newList);
    }
  }, [airlinesObject]);


  // For single trip: 
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentFlights = flights.slice(indexOfFirstPost, indexOfLastPost);

  // For return trip
  const currentReturnFlights = returnFlights.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const saveFlightOffer = () => {
    console.log(returnFlightOffer, singleFlightOffer);
    const offerObject = {returnFlightOffer: returnFlightOffer, singleFlightOffer: singleFlightOffer}
    dispatch(flightOffer(offerObject))
  }

  const maxPriceHandler = (tempMaxPriceParam) => {
    setTempMaxPrice(tempMaxPriceParam);
    console.log(tempMaxPrice);
  }


  return (
    <div className="flight-page-container">
      <div className="flight-page-topbar">
        <div className="locs">
          <div className="departure bomdel">
            {source ? source : "DEL"}
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" width="55" height="47" fill="none"><g filter="url(#filter0_d)"><path d="M39.069 25.458l-4.838 5.073 2.644 2.76L46.25 23.5l-9.375-9.792-2.644 2.762 4.838 5.072H8.75v3.916h30.319z" fill="url(#paint0_linear)" /></g><defs><linearGradient id="paint0_linear" x1="27.5" y1="13.708" x2="27.5" y2="33.292" gradientUnits="userSpaceOnUse"><stop offset=".224" stop-color="#98A1F3" stop-opacity=".93" /><stop offset=".771" stop-color="#03E7E7" stop-opacity=".85" /></linearGradient><filter id="filter0_d" x="-3" y="-8" width="61" height="63" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix" /><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" /><feOffset /><feGaussianBlur stdDeviation="4" /><feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.78 0" /><feBlend in2="BackgroundImageFix" result="effect1_dropShadow" /><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" /></filter></defs></svg>
          <div className="arrival bomdel">
            {destination ? destination : "BOM"}
          </div>
        </div>
        {
          props.location.isRoundTrip && (
            <div className="locs rounded">
              <div className="departure">
                {destination ? destination : "BOM"}
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="55" height="47" fill="none"><g filter="url(#filter0_d)"><path d="M39.069 25.458l-4.838 5.073 2.644 2.76L46.25 23.5l-9.375-9.792-2.644 2.762 4.838 5.072H8.75v3.916h30.319z" fill="url(#paint0_linear)" /></g><defs><linearGradient id="paint0_linear" x1="27.5" y1="13.708" x2="27.5" y2="33.292" gradientUnits="userSpaceOnUse"><stop offset=".224" stop-color="#98A1F3" stop-opacity=".93" /><stop offset=".771" stop-color="#03E7E7" stop-opacity=".85" /></linearGradient><filter id="filter0_d" x="-3" y="-8" width="61" height="63" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix" /><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" /><feOffset /><feGaussianBlur stdDeviation="4" /><feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.78 0" /><feBlend in2="BackgroundImageFix" result="effect1_dropShadow" /><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" /></filter></defs></svg>
              <div className="arrival">
                {source ? source : "DEL"}
              </div>
            </div>
          )
        }
      </div>

      <div className="flight-page-filters">
        <div className="filter-max-price">
          <InputSlider maxPriceHandler={maxPriceHandler} />
        </div>

        <div className="filter-only">
          <div className={`filter-click only`} onClick={() => setClickOnly(!clickOnly)}>Only These</div>
          <div className="only-filters">
            <form>
              {
                clickOnly && airlinesList &&
                airlinesList.map((airline) => {
                  return (
                    <p className="only-filter-fields">
                      <label for={airline}>
                        <input key={airline} type="checkbox" id={airline} name="only" value={airline} onChange={(e) => includedFlightsHandler(e.target.value)} />
                        <span>{airline}</span>
                      </label>
                    </p>
                  )
                })
              }
            </form>
          </div>

        </div>
        <div className="filter-except">
          <div className={`filter-click except`} onClick={() => setClickExcept(!clickExcept)}>Except These</div>
          <div className="except-filters">
            <form>
              {
                clickExcept && airlinesList &&
                airlinesList.map((airline) => {
                  return (
                    <p className="except-filter-fields">
                      <label for={airline}>
                        <input key={airline} type="checkbox" id={airline} name="except" value={airline} onChange={(e) => excludedFlightsHandler(e.target.value)} />
                        <span>{airline}</span>
                      </label>
                    </p>
                  )
                })
              }
            </form>
          </div>
        </div>

        <button className="" onClick={() => setMaxPrice(tempMaxPrice)}>GO</button>
      </div>

      <div className="flight-page-flights">
        <FormControl component="fieldset" className="flight-page direct">
          <RadioGroup name="flighSomething" className="flight-page-left" value={valRadioSingle} >
            {
              currentFlights.map((flight) => {
                return (
                  <div className={`${props.location.isRoundTrip ? "flight-card split" : "flight-card"}`} key={flight.id} >
                    <div className="airline-details">
                      <p className="airline-provider">Vistara</p>
                      <p className="airline-name">{flight.itineraries[0].segments[0].carrierCode + " " + flight.itineraries[0].segments[0].aircraft.code}</p>
                    </div>
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
                    <div className="flight-card-price">
                      <div className="flight-rating">{`₹${flight.price.total}`}</div>
                    </div>
                    <FormControlLabel value={flight.id} control={<Radio className={classes.radio} onChange={(e) => {setSingleFlightOffer(flight); setRadioSingle(e.target.value)}} />} />
                  </div>
                )
              })
            }
          </RadioGroup>
        </FormControl>

        {props.location.isRoundTrip && (
          <FormControl className="flight-page round" component="fieldset" >
            <RadioGroup name="flighSomething" value={valRadioReturn} className="flight-page-right"  >
              {
                currentReturnFlights.map((flight) => {
                  return (
                    <div className="flight-card split" key={flight.id}  >
                      <div className="flight-card-details">
                        <div className="airline-details">
                          <p className="airline-name">{flight.itineraries[0].segments[0].carrierCode + " " + flight.itineraries[0].segments[0].aircraft.code}</p>
                        </div>
                      </div>
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
                      <div className="flight-card-price">
                        <div className="flight-rating">{`₹${flight.price.total}`}</div>
                      </div>
                      <FormControlLabel value={flight.id} control={<Radio className={classes.radio} />} onChange={(e) => {setReturnFlightOffer(flight); setRadioReturn(e.target.value)}} />
                    </div>
                  )
                })
              }
            </RadioGroup>
          </FormControl>
        )
        }

      </div>
      {/* {props.location.isRoundTrip && (<Link to="/book"><button className="flight-page-continue-btn">
        Continue
        <svg className="flight-page-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="13 17 18 12 13 7" /><polyline points="6 17 11 12 6 7" /></svg>
      </button></Link>)} */}
      <div className="flight-page-pagi">

        <PaginationComponent
          postsPerPage={postsPerPage}
          totalPosts={flights.length}
          paginate={paginate} />
      </div>
      {
        (<Link className="flight-page-continue-btn" to="/book">
          <button className="flight-page-continue-button" onClick={() => saveFlightOffer()}>
            CONTINUE <i class="fas fa-angle-double-right"></i> 
          </button>
        </Link>)
      }
    </div >
  )
}

export default FlightPage;
