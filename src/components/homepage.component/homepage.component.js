import React from 'react'; 
import SearchBar from './searchbar/searchbar.component'
import './homepage.component.css'

export default function Homepage(props) { 
    return (
        <div className="home-main">

            <div className="search-box">
                <SearchBar></SearchBar>
            </div>
        </div>
    )
}