import React, { useState, useEffect } from 'react';
import './airport-codes.component.css';
import Fuse from 'fuse.js';

import airports from './airports.json';

function AirportSearch() {
    const [query, updateQuery] = useState('');

    const fuse = new Fuse(airports, {
        shouldSort: true,
        threshold: 0.4,
        maxPatternLength: 32,
        keys: [
        // {
        //     name: "IATA",
        //     weight: 0.3
        // },
        // {
        //     name: "name",
        //     weight: 0.1
        // },
        {
            name: "city",
            weight: 1
        }
        ],
        includeScore: true
    });

    var results = fuse.search(query);
    console.log(results)
    // const characterResults = query ? results.map(airport => airport.item) : airports;

    // function onSearch({ currentTarget }) {
    //     updateQuery(currentTarget.value);
    // }

    return (
        <>
            <main className="container">
                <ul className="characters">
                    {results.map(airport => {
                        const { name, IATA, city, country } = airport.item;
                        return (
                            <li key={city} className="character">
                                <ul className="character-meta">
                                    <li>
                                        <strong>Name:</strong> {name}
                                    </li>
                                    <li>
                                        <strong>IATA:</strong> {IATA}
                                    </li>
                                    <li>
                                        <strong>city:</strong> {city}
                                    </li>
                                </ul>
                            </li>
                        )
                    })}
                </ul>
                <aside>
                    <form className="search">
                        <label>Search</label>
                        <input type="text" value={query} onChange={(e) => {updateQuery(e.target.value)}} />
                    </form>
                </aside>
            </main>
        </>
    );
}

export default AirportSearch;