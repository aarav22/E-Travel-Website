import React, { useState } from 'react';
import './airport-codes.component.css';
import Fuse from 'fuse.js';

import airports from './airports.json';

function AirportSearch(props) {
    const [query, updateQuery] = useState('');
    const [value, setValue] = useState(); 
    const [display, setDisplay] = useState(false);

    const fuse = new Fuse(airports, {
        shouldSort: true,
        threshold: 0.4,
        maxPatternLength: 32,
        keys: [
            {
                name: "IATA",
                weight: 0.5
            },
            {
                name: "city",
                weight: 0.6
            }
        ],
        includeScore: true
    });
    const results = fuse.search(query);


    const clickCity = citySelected => {
        setValue(citySelected.target.value);
    }




    return (
        <div className="home-search-container">
            <form className="home-search-box">
                <label>Search</label>
                <input className="home-search-input" type="text" placeholder={props.placeholder} value={value} onChange={(e) => { updateQuery(e.target.value); setValue(query) }} />
            </form>
            {
                query.length >= 1 && (
                    <div className="home-search-results">
                        {results.slice(0, 5).map(airport => {
                            const { name, IATA, city, country } = airport.item;
                            return (
                                <button className="search-main-result" value={`${name} Airport, ${city}, ${country}, (${IATA})`} onClick={clickCity} >
                                    {`${name} Airport, ${city}, ${country}, (${IATA})`}
                                </button>
                            )
                        })
                        }
                    </div>
                )} 
        </div>
    );
}

export default AirportSearch;
