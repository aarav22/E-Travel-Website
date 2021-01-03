/* eslint-disable */

import React, {useState, useRef, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {flightItineary, userRecommendations} from '../flight-page.component/flightsSlice'
import AirportSearch from '../airport-codes.component/airport-codes.component'
import User_Recommendations from './user_recommendations'
import airportCodes from '../airport-codes.component/airports.json'
import DatePicker from "react-datepicker";
import {Input} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import M from "materialize-css";
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import "./homepage-material.component.css"

const Amadeus = require('amadeus');
const useStyles = makeStyles({
  input: {
    color: "black"
  }
});

export default function Homepage() {
  const amadeus = new Amadeus({
    clientId: `${process.env.REACT_APP_AMADEUS_API}`,
    clientSecret: `${process.env.REACT_APP_AMADEUS_SECRET}`
  });

  const classes = useStyles();
  const dispatch = useDispatch();
  const [numBookings, setNumBookings] = useState("Loading");
  const [destination, setDes] = useState('');
  const [source, setSource] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [returnDate, setEndDate] = useState(''); // Return date
  const [isOpenEco, setIsOpenEco] = useState(false);
  const [isOpenOne, setIsOpenOne] = useState(false);
  const [one, setOne] = useState("One-Way")
  const [econ, setEcon] = useState("Economy")
  const [numAdults, setAdults] = useState(1);
  const [numInfants, setInfants] = useState(0);
  const [isOpenPeps, setOpenPeps] = useState(false);
  const ecoRef = useRef();
  const oneRef = useRef();
  var cheapestRoutesConverted = [];
  var photosForCarousel = [];
  const [photos, setPhotos] = useState([{
    "offerObject": {
      "origin": "Delhi",
      "destCity": "Indore",
      "departureDate": "2021-05-14",
      "returnDate": "2021-05-17",
      "price": "4869.00"
    },
    "photo_ref": "https://picsum.photos/400/200"
  }]);




  /* Start of API calls for getting recommendations---------------------------------------------------- */

  /*
  / This is to get the current location of the user, I plug the coordinates of the user to get the city and country (Google Geocode API )
  / I use the city and country to lookup the IATA code (Amadeus Airport and City search)
  / Then I use that IATA code to get cheapest destinations from the current city (Amadeus Flight Inspiration Search)
  / Use the IATA code in the response from the previous query to get city names (Amadeus Airport and City search)
  / Use the city names to get picture reference (Google Place Search)
  / Use the reference to get pictures (Google Place Photos)
  / Use the pictures and map them to the carousel
  */


  const defineUserLocation = () => {
    let city = "Delhi", country = "IN";
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async function (position) {
        const [cityRes, countryRes] = await Promise.all([
          axios.post(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&result_type=administrative_area_level_1&key=${process.env.REACT_APP_API_KEY}`)
            .catch(err => {throw ("error from geocode", err)}),
          axios.post(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&result_type=country&key=${process.env.REACT_APP_API_KEY}`)
            .catch(err => {throw ("errpr from geocode", err)})
        ]);

        city = cityRes.data.results[0].address_components[0].long_name;
        country = countryRes.data.results[0].address_components[0].short_name;
        // console.log(city, country);
        return {city: city, country: country};
      });
    }
    return {city: city, country: country};
  }

  const getCity = (destination) => {
    var results = airportCodes.find(obj => obj.IATA === destination)
    return results.city;
  };

  // Images: 
  const googlePlaceSearch = async (cheapestRoutesConverted) => {
    const maxWidth = 400;
    const proxyurl = "https://salty-sea-64026.herokuapp.com/";
    let photosCarousel = []
    var promises = cheapestRoutesConverted.map((route) => {
      let url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${route.destCity}&fields=photos&inputtype=textquery&key=${process.env.REACT_APP_API_KEY}`;
      return axios.get(proxyurl + url)
        .then(res => {
          // console.log(res);
          let another_url = `https://maps.googleapis.com/maps/api/place/photo?parameters&maxwidth=${maxWidth}&photoreference=${res.data.candidates[0].photos[0].photo_reference}&key=${process.env.REACT_APP_API_KEY}`
          return fetch(proxyurl + another_url)
            .then(r => {
              return r.blob()
                .then(myBlob => {
                  var imageURL = URL.createObjectURL(myBlob);
                  photosCarousel.push({offerObject: route, photo_ref: imageURL});
                  return true;

                })
                .catch(err => console.log(err));
            })

        }).catch(err => console.log(err));
    });
    Promise.all(promises).then(res => {
      setPhotos(photosCarousel);
    })

  }


  /* End of API calls for getting recommendations---------------------------------------------------- */

  /*
          *********************************Begin Use Effects************************************************
  */
  useEffect(async () => {
    const locationRes = defineUserLocation()
    const iataRes = await amadeus.referenceData.locations.get({
      subType: "AIRPORT",
      keyword: locationRes.city,
      countryCode: locationRes.country
    }).then(async res => {
      await amadeus.shopping.flightDestinations.get({
        origin: res.data[0].iataCode,
      }).then(res => {
        let cheapestRoutes = (res.data).slice(0, 5);
        cheapestRoutes ? cheapestRoutes.map((route, index) => {
          let destCity = getCity(route.destination);
          let departureDate = route.departureDate;
          let returnDate = route.returnDate;
          let price = route.price.total;
          let cheapRoute = {origin: locationRes.city, originCountry: locationRes.country, destCity: destCity, departureDate: departureDate, returnDate: returnDate, price: price};
          cheapestRoutesConverted.push(cheapRoute);
        }) : "";
        googlePlaceSearch(cheapestRoutesConverted);
      }).catch(err => {throw ("error from inspiration", err)});
    })
      .catch(err => {throw ("error from getIATA", err)});
    console.log("Photos for carousel: ", photosForCarousel);
  }, []);

  useEffect(() => {
  }, [photosForCarousel]);


  useEffect(() => {
    axios.get('http://localhost:5000/api/num_bookings')
      .then(res => {
        setNumBookings(res.data.numBookings);
      })
      .catch(err => console.log(err));
  }, [])

  useEffect(() => {
    const funcHandle = (event) => {
      if (!oneRef.current?.contains(event.target)) {
        setIsOpenOne(false)
      }
    }
    window.addEventListener("click", funcHandle)
    return () => window.removeEventListener("click", funcHandle)
  }, [])


  useEffect(() => {
    const handleFunc = (event) => {
      if (!ecoRef.current?.contains(event.target)) {
        setIsOpenEco(false)
      }
    }
    window.addEventListener("click", handleFunc)
    return () => window.removeEventListener("click", handleFunc)
  }, [])

  useEffect(() => {
    M.Dropdown.init(document.querySelectorAll('.dropdown-trigger'));
    M.Modal.init(document.querySelectorAll(".modal"));
    M.Carousel.init(document.querySelectorAll(".carousel", {fullWidth: true, indicators: true}))
  }, [phoos])

  /*
    *********************************Ending Use Effects************************************************
  */

  const handleClickEco = () => {
    setIsOpenEco(!isOpenEco)
  }


  const handleClickOne = () => {
    setIsOpenOne(!isOpenOne);
  }

  const handleNumAdultChange = (event) => {
    setAdults(event.target.value === '' ? '' : Number(event.target.value));
  }

  const handleNumInfantsChange = (event) => {
    setInfants(event.target.value === '' ? '' : Number(event.target.value));
  }

  const makeFlightState = () => {
    var month = startDate.getUTCMonth() + 1; //months from 1-12
    var day = startDate.getUTCDate();
    var year = startDate.getUTCFullYear();
    var newDate = year + "-" + month + "-" + day;
    if (month < 10 || day < 10) {
      if (month < 10 && day < 10) {
        newDate = year + "-" + "0" + month + "-" + "0" + day;
      } else if (day < 10) {
        newDate = year + "-" + month + "-" + "0" + day;
      } else if (month < 10) {
        newDate = year + "-" + "0" + month + "-" + day;
      }
    }

    var newReturnDate = returnDate;
    if (returnDate) {
      month = returnDate.getUTCMonth() + 1; //months from 1-12
      day = returnDate.getUTCDate();
      year = returnDate.getUTCFullYear();
      newReturnDate = year + "-" + month + "-" + day;
      if (month < 10 || day < 10) {
        if (month < 10 && day < 10) {
          newReturnDate = year + "-" + "0" + month + "-" + "0" + day;
        } else if (day < 10) {
          newReturnDate = year + "-" + month + "-" + "0" + day;
        } else if (month < 10) {
          newReturnDate = year + "-" + "0" + month + "-" + day;
        }

      }
    }

    const flightObject = {source: source, destination: destination, date: newDate, returnDate: newReturnDate, numAdults: numAdults, numInfants: numInfants, isReturn: one !== "One-Way" ? true : false, airfareType: econ};
    dispatch(flightItineary(flightObject));
  }

  const updateDestination = (destination) => {
    setDes(destination);
  }
  const updateSource = (source) => {
    setSource(source);
  }

  function addMonths(date, months) {
    var d = date.getDate();
    date.setMonth(date.getMonth() + +months);
    if (date.getDate() !== d) {
      date.setDate(0);
    }
    return date;
  }

  return (
    <div className="home-contain">
      <section className="home-main" id="1">
        <div className="lines hide-on-small-only">
          <div className="line-1"></div>
          <div className="line-2"></div>
          <div className="line-3"></div>
          <div className="line-4"></div>
          <div className="line-5"></div>
          <div className="line-6"></div>
          <div className="line-7"></div>
          <div className="line-8"></div>
        </div>
        <div className="traveled hide-on-med-and-down">
          <div className="traveled-num">
            {numBookings}
          </div>
          <div className="traveled-text">
            PEOPLE OPTED US AS THEIR TRAVEL MATES ✈
          </div>
        </div>

        <div className="traveled-small center-align hide-on-large-only">
          <div className="traveled-num">
            {numBookings}
          </div>
          <div className="traveled-text">
            PEOPLE OPTED US AS THEIR TRAVEL MATES ✈
          </div>
        </div>

        <div className="home-drop hide-on-med-and-down">
          <div className="home-drop-eco" >
            <button data-target="drop-eco" className="dropdown-trigger drop-eco-btn btn-small transparent" onClick={handleClickEco} ref={ecoRef}>
              {`${econ}`}<svg className="chevron-down-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-down"><polyline points="6 9 12 15 18 9" /></svg>
            </button>
            <ul id="drop-eco" className="dropdown-content drop-eco-down center-align">
              <li onClick={() => setEcon("Economy")}><a className="black-text">Economy</a></li>
              <li onClick={() => setEcon("Premium")}><a className="black-text">Premium</a></li>
              <li onClick={() => setEcon("Business")}><a className="black-text">Business</a></li>
              <li onClick={() => setEcon("First")}><a className="black-text">First</a></li>
            </ul>
          </div>

          <div className="home-drop-one">
            <button data-target="drop-one" className="dropdown-trigger drop-one-btn btn-small transparent" onClick={handleClickOne} ref={oneRef}>
              {`${one}`}<svg className="chevron-down-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-down"><polyline points="6 9 12 15 18 9" /></svg>
            </button>
            <ul id="drop-one" className="dropdown-content drop-one-down center-align">
              <li onClick={() => setOne("One-Way")}><a className="black-text">One-Way</a></li>
              <li onClick={() => setOne("Round-Trip")}><a className="black-text">Round-Trip</a></li>
            </ul>
          </div>
        </div>

        <div className="home-drop-small center-align hide-on-large-only">
          <div className="home-drop-eco" >
            <button className="drop-eco-btn btn-small transparent" onClick={handleClickEco} ref={ecoRef}>
              {`${econ}`}<svg className="chevron-down-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-down"><polyline points="6 9 12 15 18 9" /></svg>
            </button>
            {
              isOpenEco && (
                <div className="drop-eco-down center-align">
                  <p onClick={() => setEcon("Economy")}>Economy</p>
                  <p onClick={() => setEcon("Premium Economy")}>Premium Economy</p>
                  <p onClick={() => setEcon("Business")}>Business</p>
                  <p onClick={() => setEcon("First")}>First</p>
                </div>
              )
            }
          </div>

          <div className="home-drop-one">
            <button className="drop-one-btn btn-small transparent" onClick={handleClickOne} ref={oneRef}>
              {`${one}`}<svg className="chevron-down-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-down"><polyline points="6 9 12 15 18 9" /></svg>
            </button>
            {
              isOpenOne && (
                <div className="drop-one-down center-align">
                  <p onClick={() => setOne("One-Way")}>One-Way</p>
                  <p onClick={() => setOne("Round-Trip")}>Round-Trip</p>
                </div>
              )
            }
          </div>
        </div>

        <div className="home-content">
          <div className={`home-search-take ${one === "Round-Trip" ? "m3" : "m4"}`}>
            <svg className="search-take-icon" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" fill="none"><g filter="url(#filter0_d)"><path d="M53 15.092a7.194 7.194 0 00-1.165-3.94 6.965 6.965 0 00-3.112-2.612 6.791 6.791 0 00-4.007-.403 6.885 6.885 0 00-3.55 1.942l-6.323 6.462-14.602-4.967a2.203 2.203 0 00-1.2-.043c-.396.098-.759.303-1.05.595l-5.354 5.426a2.31 2.31 0 00-.55.936 2.348 2.348 0 00.368 2.085c.22.293.507.526.834.681l11.655 5.404-5.85 5.978-3.848-1.977a2.21 2.21 0 00-2.61.345l-3.982 4.162A2.325 2.325 0 008 36.787c0 .608.235 1.19.654 1.621l14.602 14.923c.422.429.992.669 1.586.669.595 0 1.165-.24 1.587-.669l4.072-4.07c.337-.341.56-.783.637-1.262.077-.48.004-.971-.21-1.405l-1.935-3.932 5.85-5.978 5.287 11.91c.152.335.381.627.667.853a2.203 2.203 0 002.04.376 2.24 2.24 0 00.916-.562l5.31-5.426a2.348 2.348 0 00.54-2.3l-4.86-14.923 6.232-6.507a7.023 7.023 0 001.506-2.299c.347-.86.524-1.783.519-2.714zm-5.22 1.77l-7.29 7.45a2.315 2.315 0 00-.581 1.074 2.35 2.35 0 00.041 1.226l4.86 14.9-2.025 2.07-5.287-11.888a2.292 2.292 0 00-.664-.862 2.204 2.204 0 00-2.058-.38c-.349.112-.665.31-.923.575l-9.27 9.566c-.332.34-.552.777-.63 1.251-.076.475-.005.962.203 1.393l1.845 3.863-1.26 1.288-11.317-11.59 1.328-1.195 3.847 1.977a2.208 2.208 0 002.587-.437l9.315-9.565c.258-.262.45-.585.56-.94a2.35 2.35 0 00-.368-2.103 2.26 2.26 0 00-.845-.682l-11.722-5.404 2.025-2.07 14.58 4.967c.388.125.803.14 1.2.043.396-.098.759-.303 1.05-.595l7.29-7.45c.224-.234.491-.42.787-.547a2.362 2.362 0 012.655.547 2.3 2.3 0 01.544.795c.124.301.184.626.176.953.012.325-.04.649-.152.953a2.445 2.445 0 01-.5.817z" fill="url(#paint0_linear)" /></g><defs><linearGradient id="paint0_linear" x1="30.5" y1="8" x2="30.5" y2="54" gradientUnits="userSpaceOnUse"><stop offset=".224" stopColor="#98A1F3" stopOpacity=".93" /><stop offset=".771" stopColor="#03E7E7" stopOpacity=".85" /></linearGradient><filter id="filter0_d" x="0" y="0" width="61" height="62" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix" /><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" /><feOffset /><feGaussianBlur stdDeviation="4" /><feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.78 0" /><feBlend in2="BackgroundImageFix" result="effect1_dropShadow" /><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" /></filter></defs></svg>
            <AirportSearch locationFunction={updateSource} placeholder="Your origin?" className="destination" />
          </div>

          <div className={`home-search-arr ${one === "Round-Trip" ? "m3" : "m4"}`}>
            <svg className="search-arr-icon" viewBox="0 0 60 60 " xmlns="http://www.w3.org/2000/svg" width="64" height="63" fill="none"><g filter="url(#filter0_d)"><path d="M48.41 53.211a7.193 7.193 0 003.9-1.295 6.965 6.965 0 002.507-3.197 6.791 6.791 0 00.269-4.02 6.885 6.885 0 00-2.06-3.483l-6.668-6.103 4.478-14.76c.112-.392.112-.807.002-1.2a2.237 2.237 0 00-.629-1.03l-5.602-5.17a2.311 2.311 0 00-.953-.518 2.349 2.349 0 00-2.072.436c-.285.23-.509.524-.653.856l-5.013 11.828-6.17-5.647 1.849-3.911a2.208 2.208 0 00-.432-2.597l-4.292-3.842a2.325 2.325 0 00-1.642-.6 2.325 2.325 0 00-1.598.708L9.2 24.757a2.225 2.225 0 00-.615 1.608c.02.594.28 1.156.721 1.563l4.204 3.934c.352.326.802.535 1.283.596.481.06.97-.03 1.397-.257l3.865-2.065 6.17 5.647-11.728 5.681a2.29 2.29 0 00-.83.695 2.205 2.205 0 00-.307 2.052c.12.34.323.648.591.896l5.6 5.126c.307.275.685.464 1.093.545a2.35 2.35 0 001.224-.082l14.753-5.354 6.711 6.012a7.025 7.025 0 002.347 1.429c.872.318 1.8.464 2.73.428zm-1.943-5.158l-7.689-7.037a2.313 2.313 0 00-1.092-.546 2.347 2.347 0 00-1.224.083l-14.73 5.353-2.136-1.955 11.706-5.68c.332-.162.62-.399.838-.692a2.203 2.203 0 00.312-2.07 2.242 2.242 0 00-.605-.903l-9.87-8.946a2.317 2.317 0 00-1.271-.588c-.477-.06-.961.026-1.385.248l-3.8 1.973-1.329-1.216L25.398 14.38l1.24 1.287-1.849 3.91a2.207 2.207 0 00-.161 1.37c.094.46.333.881.684 1.202l9.87 8.991c.27.25.6.431.958.53a2.348 2.348 0 002.09-.439c.286-.233.51-.53.654-.867l5.01-11.895 2.136 1.955L41.55 35.16a2.204 2.204 0 00-.002 1.2c.11.394.328.75.629 1.03l7.688 7.038c.242.216.437.478.574.769a2.362 2.362 0 01-.459 2.672 2.302 2.302 0 01-.776.57c-.297.134-.62.205-.947.207a2.485 2.485 0 01-.957-.12 2.447 2.447 0 01-.834-.473z" fill="url(#paint0_linear)" /></g><defs><linearGradient id="paint0_linear" x1="54.749" y1="30.488" x2="8.775" y2="32.019" gradientUnits="userSpaceOnUse"><stop offset=".224" stopColor="#98A1F3" stopOpacity=".93" /><stop offset=".771" stopColor="#03E7E7" stopOpacity=".85" /></linearGradient><filter id="filter0_d" x=".026" y="0" width="63.473" height="62.507" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix" /><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" /><feOffset /><feGaussianBlur stdDeviation="4" /><feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.78 0" /><feBlend in2="BackgroundImageFix" result="effect1_dropShadow" /><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" /></filter></defs></svg>
            <AirportSearch locationFunction={updateDestination} placeholder="Your destination?" className="destination" />
          </div>

          <div className="home-search-date">
            {/* <svg className="search-date-icon" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" width="34" height="39" fill="none"><path d="M29.583 38.333H3.698C1.656 38.333 0 36.617 0 34.5V7.667C0 5.55 1.656 3.833 3.698 3.833h3.698V0h3.698v3.833h11.093V0h3.698v3.833h3.698c2.042 0 3.698 1.717 3.698 3.834V34.5c0 2.117-1.656 3.833-3.698 3.833zm-25.885-23V34.5h25.885V15.333H3.698zm0-7.666V11.5h25.885V7.667H3.698zm22.187 23h-3.698v-3.834h3.698v3.834zm-7.396 0h-3.697v-3.834h3.697v3.834zm-7.395 0H7.396v-3.834h3.698v3.834zM25.885 23h-3.698v-3.833h3.698V23zm-7.396 0h-3.697v-3.833h3.697V23zm-7.395 0H7.396v-3.833h3.698V23z" fill="url(#paint0_linear)" /><defs><linearGradient id="paint0_linear" x1="16.64" y1="0" x2="16.64" y2="38.333" gradientUnits="userSpaceOnUse"><stop offset=".224" stopColor="#98A1F3" stopOpacity=".93" /><stop offset=".771" stopColor="#03E7E7" stopOpacity=".85" /></linearGradient></defs></svg> */}
            <svg className="search-date-icon" viewBox="2 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(#filter0_d)"><path d="M46.222 51H12.778C10.139 51 8 49.075 8 46.7V16.6c0-2.375 2.14-4.3 4.778-4.3h4.778V8h4.777v4.3h14.334V8h4.777v4.3h4.778c2.639 0 4.778 1.925 4.778 4.3v30.1c0 2.375-2.14 4.3-4.778 4.3zM12.778 25.2v21.5h33.444V25.2H12.778zm0-8.6v4.3h33.444v-4.3H12.778zm28.666 25.8h-4.777v-4.3h4.777v4.3zm-9.555 0H27.11v-4.3h4.778v4.3zm-9.556 0h-4.777v-4.3h4.777v4.3zm19.111-8.6h-4.777v-4.3h4.777v4.3zm-9.555 0H27.11v-4.3h4.778v4.3zm-9.556 0h-4.777v-4.3h4.777v4.3z" fill="url(#paint0_linear)" /></g><defs><linearGradient id="paint0_linear" x1="29.5" y1="8" x2="29.5" y2="51" gradientUnits="userSpaceOnUse"><stop offset=".224" stopColor="#98A1F3" stopOpacity=".93" /><stop offset=".771" stopColor="#03E7E7" stopOpacity=".85" /></linearGradient><filter id="filter0_d" x="0" y="0" width="59" height="59" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix" /><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" /><feOffset /><feGaussianBlur stdDeviation="4" /><feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.78 0" /><feBlend in2="BackgroundImageFix" result="effect1_dropShadow" /><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" /></filter></defs></svg>
            <DatePicker className="date-search" minDate={new Date()} maxDate={addMonths(new Date(), 2)} dateFormat="yyyy-MM-dd" selected={startDate} onChange={date => setStartDate(date)} />
          </div>

          {one === "Round-Trip" &&
            (
              <div className="home-search-date">
                <svg className="search-date-icon" viewBox="2 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(#filter0_d)"><path d="M46.222 51H12.778C10.139 51 8 49.075 8 46.7V16.6c0-2.375 2.14-4.3 4.778-4.3h4.778V8h4.777v4.3h14.334V8h4.777v4.3h4.778c2.639 0 4.778 1.925 4.778 4.3v30.1c0 2.375-2.14 4.3-4.778 4.3zM12.778 25.2v21.5h33.444V25.2H12.778zm0-8.6v4.3h33.444v-4.3H12.778zm28.666 25.8h-4.777v-4.3h4.777v4.3zm-9.555 0H27.11v-4.3h4.778v4.3zm-9.556 0h-4.777v-4.3h4.777v4.3zm19.111-8.6h-4.777v-4.3h4.777v4.3zm-9.555 0H27.11v-4.3h4.778v4.3zm-9.556 0h-4.777v-4.3h4.777v4.3z" fill="url(#paint0_linear)" /></g><defs><linearGradient id="paint0_linear" x1="29.5" y1="8" x2="29.5" y2="51" gradientUnits="userSpaceOnUse"><stop offset=".224" stopColor="#98A1F3" stopOpacity=".93" /><stop offset=".771" stopColor="#03E7E7" stopOpacity=".85" /></linearGradient><filter id="filter0_d" x="0" y="0" width="59" height="59" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix" /><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" /><feOffset /><feGaussianBlur stdDeviation="4" /><feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.78 0" /><feBlend in2="BackgroundImageFix" result="effect1_dropShadow" /><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" /></filter></defs></svg>
                <DatePicker minDate={new Date()} maxDate={addMonths(new Date(), 2)} dateFormat="yyyy-MM-dd" selected={returnDate} onChange={date => setEndDate(date)} />
              </div>
            )
          }
          <div className="home-search-passengers">
            <button className="search-pas-btn modal-trigger" data-target="modal-pas">
              <svg className="search-per-icon" xmlns="http://wvww.w3.org/2000/svg" viewBox="0 0 60 60" fill="none"><g filter="url(#filter0_d)"><path d="M31.66 29.03c1.117-1.113 2.013-2.491 2.627-4.04.614-1.547.932-3.23.932-4.931 0-3.198-1.103-6.266-3.066-8.527C30.189 9.27 27.526 8 24.75 8s-5.44 1.27-7.402 3.532c-1.964 2.261-3.067 5.329-3.067 8.527 0 1.702.318 3.384.932 4.932.614 1.548 1.51 2.926 2.628 4.04-2.931 1.528-5.418 3.997-7.163 7.11C8.933 39.256 8.003 42.883 8 46.589c0 .64.22 1.253.613 1.706.393.452.925.706 1.48.706.556 0 1.089-.254 1.481-.706a2.61 2.61 0 00.614-1.706c0-3.838 1.323-7.518 3.679-10.232 2.356-2.714 5.551-4.238 8.883-4.238 3.332 0 6.527 1.524 8.883 4.238 2.356 2.714 3.68 6.394 3.68 10.232 0 .64.22 1.253.613 1.706.392.452.925.706 1.48.706.556 0 1.088-.254 1.48-.706a2.61 2.61 0 00.614-1.706c-.003-3.706-.933-7.333-2.678-10.446-1.745-3.114-4.232-5.583-7.163-7.111zm-6.91-1.736c-1.242 0-2.457-.424-3.49-1.22-1.033-.794-1.838-1.924-2.313-3.246a8.261 8.261 0 01-.357-4.18c.242-1.404.84-2.693 1.718-3.705.879-1.012 1.998-1.701 3.217-1.98a5.516 5.516 0 013.629.411c1.148.548 2.128 1.475 2.819 2.665a8.038 8.038 0 011.058 4.02c0 1.919-.662 3.76-1.84 5.116-1.177 1.357-2.775 2.12-4.441 2.12zm20.393.772c1.34-1.738 2.215-3.885 2.52-6.183a13.728 13.728 0 00-.8-6.768c-.827-2.12-2.168-3.92-3.863-5.182C41.306 8.67 39.33 7.999 37.312 8c-.555 0-1.087.254-1.48.706a2.61 2.61 0 00-.613 1.706c0 .64.22 1.253.613 1.705.393.452.925.706 1.48.706 1.666 0 3.264.763 4.442 2.12 1.178 1.357 1.84 3.197 1.84 5.116a8.095 8.095 0 01-.846 3.606c-.551 1.097-1.342 2.007-2.295 2.64-.31.207-.57.501-.753.856a2.69 2.69 0 00-.294 1.17c-.008.41.073.815.238 1.178.165.363.407.671.705.896l.816.627.272.17c2.524 1.378 4.653 3.559 6.137 6.285s2.26 5.884 2.238 9.101c0 .64.22 1.253.614 1.706.392.452.925.706 1.48.706.555 0 1.088-.254 1.48-.706A2.61 2.61 0 0054 46.588c.017-3.7-.788-7.345-2.338-10.587s-3.794-5.974-6.519-7.935z" fill="url(#paint0_linear)" /></g><defs><linearGradient id="paint0_linear" x1="31" y1="8" x2="31" y2="49" gradientUnits="userSpaceOnUse"><stop offset=".224" stopColor="#98A1F3" stopOpacity=".93" /><stop offset=".771" stopColor="#03E7E7" stopOpacity=".85" /></linearGradient><filter id="filter0_d" x="0" y="0" width="62" height="57" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix" /><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" /><feOffset /><feGaussianBlur stdDeviation="4" /><feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.78 0" /><feBlend in2="BackgroundImageFix" result="effect1_dropShadow" /><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" /></filter></defs></svg>
            </button>
            <div className="modal black-text" id="modal-pas">
              <div className="modal-content">
                <h6 className="black-text">Number of Adults</h6>
                <div className="per-drop-adults">
                  <Input
                    className={classes.input}
                    value={numAdults}
                    margin="dense"
                    placeholder="Adults"
                    color="secondary"
                    disableUnderline={true}
                    onChange={handleNumAdultChange}
                    inputProps={{
                      step: 1,
                      min: 1,
                      max: 5,
                      type: 'number',
                    }}
                  />
                </div>

                <h6 className="black-text">Number of Children</h6>
                <Input
                  className={classes.input}
                  value={numInfants}
                  margin="dense"
                  placeholder="Children"
                  onChange={handleNumInfantsChange}
                  disableUnderline={true}
                  inputProps={{
                    step: 1,
                    min: 1,
                    max: numAdults,
                    type: 'number',
                  }}
                />
              </div>
              <div className="modal-footer">
                <button className="btn black modal-close waves-effect waves-light">Close</button>
              </div>
            </div>
          </div>


          <Link
            className="search-btn"
            to={{
              pathname: "/flights",
              isRoundTrip: one === "Round-Trip" ? true : false
            }}>
            <button className="search-button">
              <svg viewBox="0 0 65 65" xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="none"><style></style><g filter="url(#filter0_d)"><path d="M50.1 53L34.3 37.5c-7.1 4.9-16.8 3.7-22.4-2.7-5.6-6.5-5.1-16.1 1-22 6.1-6 15.9-6.4 22.5-1 6.6 5.5 7.8 15 2.8 21.9L54 49.2 50.1 53zM24.6 13.4c-5.2 0-9.8 3.6-10.8 8.7-1.1 5 1.6 10.1 6.4 12.1 4.8 2 10.5.5 13.5-3.7s2.6-9.9-1-13.7l1.7 1.7-1.9-1.9c-2.1-2-4.9-3.2-7.9-3.2z" fill="url(#paint0_linear)" /></g></svg>
            </button>

            {makeFlightState()}
          </Link>

        </div>
        <a href="#2" className="arrow bounce">
        </a>
      </section>
      <section style={{display: "flex", justifyItems: "center"}}>
        {
          (photos[0] && photos[1] && photos[2] && photos[3]) ?
            <div id="2" style={{position: "absolute", left: "10%", top: "60rem", width: "80%"}} className="carousel carousel-slider center">
              {
                photos.map((item, index) =>
                  <div key={index} className="carousel-item white-text">
                    <img src={item.photo_ref} alt="something" />
                    <h2>{item.offerObject.destCity}</h2>
                    <p className="white-text">This is your first panel</p>
                    {console.log("I am everywhere", photos)}
                  </div>
                )
              }
            </div>
            :
            <div id="2" style={{position: "absolute", left: "10%", top: "60rem", width: "80%"}} className="carousel carousel-slider center">
              <div className="carousel-item white-text">
                <img src="https://picsum.photos/400" alt="something" />
                <h2>"item.offerObject.destCity"</h2>
                <p className="white-text">This is your first panel</p>
              </div>
            </div>
        }
      </section>
      <a className="transparent btn-large" style={{position: "absolute", left: "45%", top: "90rem"}} href="#1">Back to Top</a>
    </div>
  )
}
