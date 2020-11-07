import React, {useState} from 'react'; 
import SearchBar from './searchbar/searchbar.component'
import DatePicker from './datepicker.component/datepicker.component'
import DateTimePicker from 'react-datetime-picker' // https://www.npmjs.com/package/react-datetime-picker
import calendarIcon from '../../icons/calendar.svg'
import './homepage.component.css'

export default function Homepage(props) { 
    const [value, onChangeDateTime] = useState(new Date());
    var time = value ?value.toLocaleTimeString(): ""
    console.log("value: ", time);

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
        <div className="home-main">
            
            <div className="search-box">
                <SearchBar/>
            </div>
            {/* <DatePicker/> */}
                    <DateTimePicker 
                        amPmAriaLabel="Select AM/PM"
                        calendarAriaLabel="Toggle calendar"
                        clearAriaLabel="Clear value"
                        dayAriaLabel="Day"
                        hourAriaLabel="Hour"
                        maxDetail="second"
                        minuteAriaLabel="Minute"
                        monthAriaLabel="Month"
                        nativeInputAriaLabel="Date and time"
                        onChange={onChangeDateTime}
                        secondAriaLabel="Second"
                        value={value}
                        yearAriaLabel="Year"
                        maxDetail="minute"
                        calendarIcon={null}
                        minDate= {new Date()}
                        className="dateTime"
                        />
            </div>
    )
}