// React Imports
import React from "react";
import {Route, Switch} from "react-router-dom";

// components:
import Homepage from "./components/homepage.component/homepage.component";
import Error from "./components/error.component/error.component";
import Navbar from "./components/nav.component/nav.component";
import Address from "./components/profile.component/add.profile.component";
import FlightPage from "./components/flight-page.component/flight-page.component";
import HotelPage from "./components/hotel-page.component/hotel-page.component";
import Booking from "./components/booking.component/booking.component";
import Successful from "./components/successful.component/successful.component"
import Profile from "./components/profile.component/profile.component"


import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <Switch>
          <Route path="/" exact component={Homepage} />

          <Route path="/add" component={Address} />

          <Route path="/flights" component={FlightPage} />

          <Route path="/hotels" component={HotelPage} />

          <Route path="/book" component={Booking} />

          <Route path="/successful" component={Successful} />

          <Route path="/profile" component={Profile} />

          <Route path="*" component={Error} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
