import React from 'react';
import './searchbar.component.css'
import Search from '@material-ui/icons/FlightTakeoff';

export default function SearchBar(props) {
    return (
        <div class="searchBox">
            <input class="searchInput" type="text" name="" placeholder="Search"/>
                <button class="searchButton" href="#">
                    <Search/>
                </button>
        </div> 
    )
}  