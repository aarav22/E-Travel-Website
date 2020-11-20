import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { flightItineary } from '../flight-page.component/flightsSlice'
import AirportSearch from '../airport-codes.component/airport-codes.component'
import DatePicker from "react-datepicker";

import './homepage.component.css';
import "react-datepicker/dist/react-datepicker.css";


export default function Homepage() {
    const dispatch = useDispatch();
    const [destination, setDes] = useState('');
    const [source, setSource] = useState('');
    const [startDate, setStartDate] = useState(new Date());

    const makeFlightState = () => {
        const flightObject = { source: source, destination: destination };
        dispatch(flightItineary(flightObject));
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
            <div className="home-content">
                <AirportSearch placeholder="Your origin?" className="destination" />
                <AirportSearch placeholder="Your destination?" className="destination" />
                {/* <AirportSearch className="destination" /> */}
                <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
                <Link to="/flights">
                    <button className="search-button">Search</button>
                    {makeFlightState()}
                </Link>
            </div>
        </div>
    )
}
