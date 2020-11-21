import React, {useState} from 'react';
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

  return (
    <div className={`home-search-container ${query.length >= 1 ? "visible" : ""}`}>
      <form className="home-search-box">
        <input className="home-search-input" type="text" placeholder={props.placeholder} value={query} onChange={(e) => {updateQuery(e.target.value); setValue(query)}} />
      </form>
      {
        query.length >= 1 && (
          <ul className="home-search-results">
            {results.slice(0, 5).map(airport => {
              const {name, IATA, city, country} = airport.item;
              return (
                <li className="search-main-result" onClick={(e) => updateQuery(e.target.innerText)} >
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
