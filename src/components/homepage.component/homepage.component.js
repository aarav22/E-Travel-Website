import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {flightItineary} from '../flight-page.component/flightsSlice'

import Search from "./search";

import './homepage.component.css';


export default function Homepage() {
    const dispatch = useDispatch(); 
    const [destination, setDes] = useState('');
    const [source, setSource] = useState('');
    const makeFlightState = () => {
        const flightObject = {source: source, destination: destination}; 
        dispatch(flightItineary(flightObject)); 
    }

    return (
        <div className="home-main">
            <div className="home-left-pane">
                <div className="home-text-wrapper">
                    <span className="home-text">
                        {/*  book a ride on one of our futuristic flying cars and let it transfer you to the world of 2081. */}
                        some text describing our website or simply put, dummy text
                    </span>
                </div>
            </div>
            <div className="home-right-pane">
                <input className="destination" placeholder="Destination" onChange={(e) => {setDes(e.target.value)}}></input>
                <input className="arrival" placeholder="Source" onChange={(e) => {setSource(e.target.value)}}></input>
                <Link to="/flights">
                    <button className="search-button">Search</button>
                    {makeFlightState()}                    
                </Link>
            </div>
        </div>
    )
}
