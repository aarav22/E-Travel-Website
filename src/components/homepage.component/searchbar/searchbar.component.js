import React, { useState } from 'react';
import './searchbar.component.css'
import PlacesAutocomplete, {
    geocodeByAddress,
    geocodeByPlaceId,
    getLatLng,
} from 'react-places-autocomplete';

import Search from '@material-ui/icons/FlightTakeoff';

export default function SearchBar(props) {
    const [address, setAddress] = useState('');
    var handleChange = address => {
        setAddress(address)
    }

    var handleSelect = address => {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => console.log('Success', latLng))
            .catch(error => console.error('Error', error));
    };
    const API_Key = process.env.REACT_APP_API_KEY;


    return (
            <div class="searchBox">
            <button class="searchButton" href="#">
            <Search />
            <PlacesAutocomplete
                value={address}
                onChange={handleChange}
                onSelect={handleSelect}>
                
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    
                        <input {...getInputProps({
                                className: 'searchInput',
                                placeholder: 'Enter Location ...',
                                autoFocus: true
                            })}
                        />

                        <div className="autocomplete-dropdown-container">
                            {loading && <div>Loading...</div>}
                            {suggestions.map(suggestion => {
                                const className = suggestion.active
                                    ? 'suggestion-item--active'
                                    : 'suggestion-item';
                                // inline style for demonstration purpose
                                const style = suggestion.active
                                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                return (
                                    <div
                                        {...getSuggestionItemProps(suggestion, {
                                            className,
                                            style,
                                        })}
                                    >
                                        <span>{suggestion.description}</span>
                                    </div>
                                );
                            })}
                        </div>
                    
                )}
            </PlacesAutocomplete>
            
            {/* <input class="searchInput" type="text" name="" placeholder="Search" /> */}
            

            </button>
        </div>
    )
}  