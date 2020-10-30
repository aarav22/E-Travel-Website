import React from 'react'; 
import SearchBar from './searchbar/searchbar.component'
import DatePicker from './datepicker/datepicker.component'
import './homepage.component.css'

export default function Homepage(props) { 
    return (
        <div>
            <p> Hello, you're at the Homepage </p>
            <div className="search-box">
                <SearchBar></SearchBar>
                <SearchBar></SearchBar>
            </div>
           
            {/* <DatePicker></DatePicker> */}
        </div>
    )
}