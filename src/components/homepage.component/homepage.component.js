import React, {useState, useRef, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {flightItineary} from '../flight-page.component/flightsSlice'
import AirportSearch from '../airport-codes.component/airport-codes.component'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import './homepage.component.css';


export default function Homepage() {
  const dispatch = useDispatch();
  const [destination, setDes] = useState('');
  const [source, setSource] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [returnDate, setEndDate] = useState(''); // Return date
  const [isReturn, setIsReturn] = useState(false); // Return option selected
  const [isOpenEco, setIsOpenEco] = useState(false);
  const [isOpenOne, setIsOpenOne] = useState(false);
  const [one, setOne] = useState("One-Way")
  const [econ, setEcon] = useState("Economy")
  const [isOpenEco, setIsOpenEco] = useState(false);
  const [numAdults, setAdults] = useState(1);
  const [numInfants, setInfants] = useState(0);

  const ecoRef = useRef();
  const oneRef = useRef();

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


  const handleClickEco = () => {
    setIsOpenEco(!isOpenEco)
  }


  const handleClickOne = () => {
    setIsOpenOne(!isOpenOne);
  }

  const makeFlightState = () => {
    var month = startDate.getUTCMonth() + 1; //months from 1-12
    var day = startDate.getUTCDate();
    var year = startDate.getUTCFullYear();
    const newDate = year + "-" + month + "-" + day;

    const flightObject = {source: source, destination: destination, date: newDate, returnDate: returnDate, numAdults: numAdults, numInfants: numInfants, isReturn: isReturn};
    dispatch(flightItineary(flightObject));
  }

  const updateDestination = (destination) => {
    setDes(destination);
  }
  const updateSource = (source) => {
    setSource(source);
  }

  const dateFunction = () => {

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
    <div className="home-main">
      <div className="lines">
        <div className="line-1"></div>
        <div className="line-2"></div>
        <div className="line-3"></div>
        <div className="line-4"></div>
        <div className="line-5"></div>
        <div className="line-6"></div>
        <div className="line-7"></div>
        <div className="line-8"></div>
      </div>
      <div className="traveled">
        <div className="traveled-num">
          {"000000"}
        </div>
        <div className="traveled-text">
          PEOPLE HAVE TRAVELED WITH US ✈
          </div>
      </div>
      <div className="home-drop-eco" >
        <button className="drop-eco-btn" onClick={handleClickEco} ref={ecoRef}>
          {`${econ}`}<svg className="chevron-down-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9" /></svg>
        </button>
        {
          isOpenEco && (
            <div className="drop-eco-down">
              <p onClick={() => setEcon("Economy")}>Economy</p>
              <p onClick={() => setEcon("Premium Economy")}>Premium Economy</p>
              <p onClick={() => setEcon("Business")}>Business</p>
              <p onClick={() => setEcon("First")}>First</p>
            </div>
          )
        }
      </div>
      <div className="home-drop-one" >
        <button className="drop-one-btn" onClick={handleClickOne} ref={oneRef}>
          {`${one}`}<svg className="chevron-down-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9" /></svg>
        </button>
        {
          isOpenOne && (
            <div className="drop-one-down">
              <p onClick={() => setOne("One-Way")}>One-Way</p>
              <p onClick={() => setOne("Round-Trip")}>Round-Trip</p>
            </div>
          )
        }
      </div>
      <div className="home-content">
        <div className="home-search-take">
          <svg className="search-take-icon" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" fill="none"><g filter="url(#filter0_d)"><path d="M53 15.092a7.194 7.194 0 00-1.165-3.94 6.965 6.965 0 00-3.112-2.612 6.791 6.791 0 00-4.007-.403 6.885 6.885 0 00-3.55 1.942l-6.323 6.462-14.602-4.967a2.203 2.203 0 00-1.2-.043c-.396.098-.759.303-1.05.595l-5.354 5.426a2.31 2.31 0 00-.55.936 2.348 2.348 0 00.368 2.085c.22.293.507.526.834.681l11.655 5.404-5.85 5.978-3.848-1.977a2.21 2.21 0 00-2.61.345l-3.982 4.162A2.325 2.325 0 008 36.787c0 .608.235 1.19.654 1.621l14.602 14.923c.422.429.992.669 1.586.669.595 0 1.165-.24 1.587-.669l4.072-4.07c.337-.341.56-.783.637-1.262.077-.48.004-.971-.21-1.405l-1.935-3.932 5.85-5.978 5.287 11.91c.152.335.381.627.667.853a2.203 2.203 0 002.04.376 2.24 2.24 0 00.916-.562l5.31-5.426a2.348 2.348 0 00.54-2.3l-4.86-14.923 6.232-6.507a7.023 7.023 0 001.506-2.299c.347-.86.524-1.783.519-2.714zm-5.22 1.77l-7.29 7.45a2.315 2.315 0 00-.581 1.074 2.35 2.35 0 00.041 1.226l4.86 14.9-2.025 2.07-5.287-11.888a2.292 2.292 0 00-.664-.862 2.204 2.204 0 00-2.058-.38c-.349.112-.665.31-.923.575l-9.27 9.566c-.332.34-.552.777-.63 1.251-.076.475-.005.962.203 1.393l1.845 3.863-1.26 1.288-11.317-11.59 1.328-1.195 3.847 1.977a2.208 2.208 0 002.587-.437l9.315-9.565c.258-.262.45-.585.56-.94a2.35 2.35 0 00-.368-2.103 2.26 2.26 0 00-.845-.682l-11.722-5.404 2.025-2.07 14.58 4.967c.388.125.803.14 1.2.043.396-.098.759-.303 1.05-.595l7.29-7.45c.224-.234.491-.42.787-.547a2.362 2.362 0 012.655.547 2.3 2.3 0 01.544.795c.124.301.184.626.176.953.012.325-.04.649-.152.953a2.445 2.445 0 01-.5.817z" fill="url(#paint0_linear)" /></g><defs><linearGradient id="paint0_linear" x1="30.5" y1="8" x2="30.5" y2="54" gradientUnits="userSpaceOnUse"><stop offset=".224" stop-color="#98A1F3" stop-opacity=".93" /><stop offset=".771" stop-color="#03E7E7" stop-opacity=".85" /></linearGradient><filter id="filter0_d" x="0" y="0" width="61" height="62" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix" /><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" /><feOffset /><feGaussianBlur stdDeviation="4" /><feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.78 0" /><feBlend in2="BackgroundImageFix" result="effect1_dropShadow" /><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" /></filter></defs></svg>
          <AirportSearch locationFunction={updateSource} placeholder="Your origin?" className="destination" />
        </div>

        <div className="home-search-arr">
          <svg className="search-arr-icon" viewBox="0 0 60 60 " xmlns="http://www.w3.org/2000/svg" width="64" height="63" fill="none"><g filter="url(#filter0_d)"><path d="M48.41 53.211a7.193 7.193 0 003.9-1.295 6.965 6.965 0 002.507-3.197 6.791 6.791 0 00.269-4.02 6.885 6.885 0 00-2.06-3.483l-6.668-6.103 4.478-14.76c.112-.392.112-.807.002-1.2a2.237 2.237 0 00-.629-1.03l-5.602-5.17a2.311 2.311 0 00-.953-.518 2.349 2.349 0 00-2.072.436c-.285.23-.509.524-.653.856l-5.013 11.828-6.17-5.647 1.849-3.911a2.208 2.208 0 00-.432-2.597l-4.292-3.842a2.325 2.325 0 00-1.642-.6 2.325 2.325 0 00-1.598.708L9.2 24.757a2.225 2.225 0 00-.615 1.608c.02.594.28 1.156.721 1.563l4.204 3.934c.352.326.802.535 1.283.596.481.06.97-.03 1.397-.257l3.865-2.065 6.17 5.647-11.728 5.681a2.29 2.29 0 00-.83.695 2.205 2.205 0 00-.307 2.052c.12.34.323.648.591.896l5.6 5.126c.307.275.685.464 1.093.545a2.35 2.35 0 001.224-.082l14.753-5.354 6.711 6.012a7.025 7.025 0 002.347 1.429c.872.318 1.8.464 2.73.428zm-1.943-5.158l-7.689-7.037a2.313 2.313 0 00-1.092-.546 2.347 2.347 0 00-1.224.083l-14.73 5.353-2.136-1.955 11.706-5.68c.332-.162.62-.399.838-.692a2.203 2.203 0 00.312-2.07 2.242 2.242 0 00-.605-.903l-9.87-8.946a2.317 2.317 0 00-1.271-.588c-.477-.06-.961.026-1.385.248l-3.8 1.973-1.329-1.216L25.398 14.38l1.24 1.287-1.849 3.91a2.207 2.207 0 00-.161 1.37c.094.46.333.881.684 1.202l9.87 8.991c.27.25.6.431.958.53a2.348 2.348 0 002.09-.439c.286-.233.51-.53.654-.867l5.01-11.895 2.136 1.955L41.55 35.16a2.204 2.204 0 00-.002 1.2c.11.394.328.75.629 1.03l7.688 7.038c.242.216.437.478.574.769a2.362 2.362 0 01-.459 2.672 2.302 2.302 0 01-.776.57c-.297.134-.62.205-.947.207a2.485 2.485 0 01-.957-.12 2.447 2.447 0 01-.834-.473z" fill="url(#paint0_linear)" /></g><defs><linearGradient id="paint0_linear" x1="54.749" y1="30.488" x2="8.775" y2="32.019" gradientUnits="userSpaceOnUse"><stop offset=".224" stop-color="#98A1F3" stop-opacity=".93" /><stop offset=".771" stop-color="#03E7E7" stop-opacity=".85" /></linearGradient><filter id="filter0_d" x=".026" y="0" width="63.473" height="62.507" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix" /><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" /><feOffset /><feGaussianBlur stdDeviation="4" /><feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.78 0" /><feBlend in2="BackgroundImageFix" result="effect1_dropShadow" /><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" /></filter></defs></svg>
          <AirportSearch locationFunction={updateDestination} placeholder="Your destination?" className="destination" />
        </div>

        <div className="home-search-date">
          <svg className="search-date-icon" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" width="34" height="39" fill="none"><path d="M29.583 38.333H3.698C1.656 38.333 0 36.617 0 34.5V7.667C0 5.55 1.656 3.833 3.698 3.833h3.698V0h3.698v3.833h11.093V0h3.698v3.833h3.698c2.042 0 3.698 1.717 3.698 3.834V34.5c0 2.117-1.656 3.833-3.698 3.833zm-25.885-23V34.5h25.885V15.333H3.698zm0-7.666V11.5h25.885V7.667H3.698zm22.187 23h-3.698v-3.834h3.698v3.834zm-7.396 0h-3.697v-3.834h3.697v3.834zm-7.395 0H7.396v-3.834h3.698v3.834zM25.885 23h-3.698v-3.833h3.698V23zm-7.396 0h-3.697v-3.833h3.697V23zm-7.395 0H7.396v-3.833h3.698V23z" fill="url(#paint0_linear)" /><defs><linearGradient id="paint0_linear" x1="16.64" y1="0" x2="16.64" y2="38.333" gradientUnits="userSpaceOnUse"><stop offset=".224" stop-color="#98A1F3" stop-opacity=".93" /><stop offset=".771" stop-color="#03E7E7" stop-opacity=".85" /></linearGradient></defs></svg>
          <DatePicker minDate={new Date()} maxDate={addMonths(new Date(), 2)} dateFormat="yyyy-MM-dd" selected={startDate} onChange={date => setStartDate(date)} />
        </div>

        <div className="home-search-passengers">
          <svg className="passengers-icon" viewBox="0 0 60 60 " xmlns="http://www.w3.org/2000/svg" width="34" height="39" fill="none"><g filter="url(#filter0_d)"><path d="M48.41 53.211a7.193 7.193 0 003.9-1.295 6.965 6.965 0 002.507-3.197 6.791 6.791 0 00.269-4.02 6.885 6.885 0 00-2.06-3.483l-6.668-6.103 4.478-14.76c.112-.392.112-.807.002-1.2a2.237 2.237 0 00-.629-1.03l-5.602-5.17a2.311 2.311 0 00-.953-.518 2.349 2.349 0 00-2.072.436c-.285.23-.509.524-.653.856l-5.013 11.828-6.17-5.647 1.849-3.911a2.208 2.208 0 00-.432-2.597l-4.292-3.842a2.325 2.325 0 00-1.642-.6 2.325 2.325 0 00-1.598.708L9.2 24.757a2.225 2.225 0 00-.615 1.608c.02.594.28 1.156.721 1.563l4.204 3.934c.352.326.802.535 1.283.596.481.06.97-.03 1.397-.257l3.865-2.065 6.17 5.647-11.728 5.681a2.29 2.29 0 00-.83.695 2.205 2.205 0 00-.307 2.052c.12.34.323.648.591.896l5.6 5.126c.307.275.685.464 1.093.545a2.35 2.35 0 001.224-.082l14.753-5.354 6.711 6.012a7.025 7.025 0 002.347 1.429c.872.318 1.8.464 2.73.428zm-1.943-5.158l-7.689-7.037a2.313 2.313 0 00-1.092-.546 2.347 2.347 0 00-1.224.083l-14.73 5.353-2.136-1.955 11.706-5.68c.332-.162.62-.399.838-.692a2.203 2.203 0 00.312-2.07 2.242 2.242 0 00-.605-.903l-9.87-8.946a2.317 2.317 0 00-1.271-.588c-.477-.06-.961.026-1.385.248l-3.8 1.973-1.329-1.216L25.398 14.38l1.24 1.287-1.849 3.91a2.207 2.207 0 00-.161 1.37c.094.46.333.881.684 1.202l9.87 8.991c.27.25.6.431.958.53a2.348 2.348 0 002.09-.439c.286-.233.51-.53.654-.867l5.01-11.895 2.136 1.955L41.55 35.16a2.204 2.204 0 00-.002 1.2c.11.394.328.75.629 1.03l7.688 7.038c.242.216.437.478.574.769a2.362 2.362 0 01-.459 2.672 2.302 2.302 0 01-.776.57c-.297.134-.62.205-.947.207a2.485 2.485 0 01-.957-.12 2.447 2.447 0 01-.834-.473z" fill="url(#paint0_linear)" /></g><defs><linearGradient id="paint0_linear" x1="54.749" y1="30.488" x2="8.775" y2="32.019" gradientUnits="userSpaceOnUse"><stop offset=".224" stop-color="#98A1F3" stop-opacity=".93" /><stop offset=".771" stop-color="#03E7E7" stop-opacity=".85" /></linearGradient><filter id="filter0_d" x=".026" y="0" width="63.473" height="62.507" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix" /><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" /><feOffset /><feGaussianBlur stdDeviation="4" /><feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.78 0" /><feBlend in2="BackgroundImageFix" result="effect1_dropShadow" /><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" /></filter></defs></svg>
          <input placeholder="Number of Adults?" onChange={(e) => {setAdults(e.target.value)}} />
          <input placeholder="Number of Children?" onChange={(e) => {setInfants(e.target.value)}} />
        </div>

        <Link to="/flights">
          <button className="search-button">Search</button>
          {makeFlightState()}
        </Link>
      </div>
    </div>
  )
}
