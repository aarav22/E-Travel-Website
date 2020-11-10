import React, {useState} from 'react'; 
import Search from "./search"
import DateFnsUtils from '@date-io/date-fns';
import './homepage.component.css';
// import {
    // MuiPickersUtilsProvider,
    // DateTimePicker
// } from '@material-ui/pickers';


export default function Homepage(props) { 
    const [selectedDate, handleDateChange] = useState(new Date());

    if ("geolocation" in navigator) {
        console.log("Available");
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
        });
    } else {
        console.log("Not Available");
    }


    return ( 
        // <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div className="home-main">
                <div className="home-left-pane">
                    <div className="home-text-wrapper">
                        <span className="home-text">
                            book a ride on one of our futuristic flying cars and let it transfer you to the world of 2081.
                        </span>
                    </div>
                </div>
                <div className="home-right-pane">
                    <Search placeholder={"Enter Destination..."}/>
                    <Search placeholder={"Enter Arrival..."}/>
                    {/* <DateTimePicker value={selectedDate} onChange={handleDateChange} /> */}
                </div>
            </div>
        // </MuiPickersUtilsProvider>
    )
}