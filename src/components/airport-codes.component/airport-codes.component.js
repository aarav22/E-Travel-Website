import React, {useState} from 'react';
import './airport-codes.component.css';
import Fuse from 'fuse.js';

import airports from './airports.json';

function AirportSearch() {

  const fuse = new Fuse(airports, {
    shouldSort: true,
    threshold: 0.4,
    maxPatternLength: 32,
    keys: [
      {
        name: "IATA",
        weight: 0.5
      },
      // {
      //     name: "name",
      //     weight: 0.1
      // },
      {
        name: "city",
        weight: 0.6
      }
    ],
    includeScore: true
  });
  const results = fuse.search(query);



  console.log(results)


  return (
    <div className="home-search-container">
      <form className="home-search-box">
        <label>Search</label>
        <input type="text" value={query} onChange={(e) => {updateQuery(e.target.value)}} />
      </form>
      {
        query.length >= 1 && (
          <div className="home-search-results">
            {results.slice(0, 5).map(airport => {
              const {name, IATA, city, country} = airport.item;
              return (
                <button className="search-main-result">
                  {`${name} Airport, ${city}, ${country}, (${IATA})`}
                </button>
              )
            })
    const [query, updateQuery] = useState('');

    const fuse = new Fuse(airports, {
              shouldSort: true,
        threshold: 0.4,
        maxPatternLength: 32,
        keys: [
            {
              name: "IATA",
                weight: 0.5
            },
            // {
              //     name: "name",
              //     weight: 0.1
              // },
              {
                name: "city",
                weight: 0.6
              }
        ],
        includeScore: true
    });
    const results = fuse.search(query);

    // var results = fuse.search(query);
    // console.log(results)
    // // const characterResults = query ? results.map(airport => airport.item) : airports;

    // // function onSearch({currentTarget}) {
              // //     updateQuery(currentTarget.value);
              // // }


              console.log(results)


    return (
            <div className="home-search-container">
              <form className="home-search-box">
                <label>Search</label>
                <input type="text" value={query} onChange={(e) => {updateQuery(e.target.value)}} />
              </form>
              {
                query.length >= 1 && (
                  <div className="home-search-results">
                    {results.slice(0, 5).map(airport => {
                      const {name, IATA, city, country} = airport.item;
                      return (
                        <div className="search-main-result">
                          {`${name} Airport, ${city}, ${country}, (${IATA})`}
                        </div>
                      )
                    })
                    }
                  </div>
                )}
            </div>
    );
}

export default AirportSearch;
