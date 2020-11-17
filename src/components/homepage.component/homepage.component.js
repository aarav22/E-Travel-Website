import React from 'react';
import {Link} from 'react-router-dom';

import Search from "./search";

import './homepage.component.css';


export default function Homepage() {

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
        <input className="destination" placeholder="destination"></input>
        <input className="arrival" placeholder="arrival"></input>
        <Link to="/flights">
          <button className="search-button">Search</button>
        </Link>
      </div>
    </div>
  )
}
