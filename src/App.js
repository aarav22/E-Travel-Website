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


function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/" exact component={Homepage} />

        <Route path="/add" component={Address} />

        <Route path="/flights" component={FlightPage} />

        <Route path="/hotels" component={HotelPage} />

        <Route path="/book" component={Booking} />

        <Route path="*" component={Error} />
      </Switch>
    </div>
  );
}

export default App;
