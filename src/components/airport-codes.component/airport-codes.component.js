import React, {useState} from 'react';
// import './airport-codes.component.css';
import Fuse from 'fuse.js';

import airports from './airports.json';

const AirportSearch = (props) => {
  const [query, updateQuery] = useState('');
  const [some, changeSome] = useState(false);
  const [val, updateVal] = useState(props.placeholder)

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

  return (
    <div className={`home-search-container ${val.length >= 1 ? "visible" : ""} ${some ? "something" : ""}`}>
      <form className="home-search-box">
        <input className="home-search-input" type="text" placeholder={val} value={query} onChange={(e) => {updateQuery(e.target.value);}} />
      </form>
      {
        query.length >= 1 && (
          <ul className="home-search-results">
            {results.slice(0, 5).map(airport => {
              const {name, IATA, city, country} = airport.item;
              return (
                <li className="search-main-result truncate" onClick={(e) => {changeSome(true); updateQuery(""); updateVal(e.target.innerText); props.locationFunction(IATA)}} >
                  {`${name} Airport, ${city}, ${country}, (${IATA})`}
                </li>
              )
            })
            }
          </ul>
        )}
    </div>
  );
}

export default AirportSearch;
