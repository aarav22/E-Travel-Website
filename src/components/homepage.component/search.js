import React, { useState } from 'react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';


export default function Search(props) {
    const [address, setAddress] = useState("");
    var handleChange = (address) => {
        setAddress(address);
    };

    var handleSelect = (address) => {
        setAddress(address);
        var res = geocodeByAddress(address)
            .then(results => 
                getLatLng(results[0]))
            .then(latLng => console.log("success", latLng))
            .catch(err => console.log("Error: ", err))
        console.log(res);
    };

    function getCurrentLocation() {
        if ("geolocation" in navigator) {
            console.log("Available");
            navigator.geolocation.getCurrentPosition(function(position) {
                console.log("Latitude is :", position.coords.latitude);
                console.log("Longitude is :", position.coords.longitude);
            });
        } else {
            console.log("Not Available");
        }
        
    }

    return (
        <div className="search-main">
            <PlacesAutocomplete
                value={address}
                onChange={handleChange}
                onSelect={handleSelect}
                shouldFetchSuggestions = {true}
            >{
            ({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
                return (
                    <div className="search-area">
                        <div className="search-bar">
                            <button className="search-ico" onClick={getCurrentLocation}>
                                <svg className="search-ico-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 368.7 368.7"><path d="M184.3 0C102 0 35 67 35 149.3c0 34 11.1 66 32.2 92.5 27.3 34.4 106.6 116 109.9 119.5l7.2 7.4 7.2-7.4c3.4-3.5 82.7-85.1 110-119.5 21-26.5 32.2-58.5 32.2-92.5C333.6 67 266.7 0 184.3 0zM285.8 229.4c-22 27.7-80.9 89.3-101.5 110.6 -20.5-21.3-79.5-82.9-101.4-110.6 -18.2-23-27.9-50.7-27.9-80.1C55 78 113 20 184.3 20c71.3 0 129.3 58 129.3 129.3C313.6 178.7 304 206.4 285.8 229.4z" /><path d="M184.3 59.3c-48.7 0-88.4 39.6-88.4 88.4 0 48.7 39.6 88.4 88.4 88.4s88.4-39.6 88.4-88.4S233.1 59.3 184.3 59.3zM184.3 216c-37.7 0-68.4-30.7-68.4-68.4 0-37.7 30.7-68.4 68.4-68.4s68.4 30.7 68.4 68.4C252.7 185.3 222 216 184.3 216z" /></svg>
                                Current Location
                                
                                {/* <div className="search-results">
                                        <span className="suggestion-description">
                                            {"This is a string"}
                                        </span>
                                </div> */}
                            </button>
                            <input {
                                ...getInputProps({
                                    className: "search-input",
                                    placeholder: props.placeholder ? props.placeholder : "Enter Location..." ,
                                    autoFocus: true
                                })
                            }>
                            </input>
                        </div>
                        <div className="search-results">
                            {loading && <div>Loading...</div> }
                            {/* <div className="currentAddress"> This is a string </div> */}
                            {suggestions.map(suggestion => {
                                const className = suggestion.active ? "suggestion-item suggestion-active" : "suggestion-item";
                                return (
                                    <div  
                                        
                                        {...getSuggestionItemProps(suggestion, {
                                        className,
                                        })}>
                                        
                                        <span className="suggestion-description">
                                            {suggestion.description}
                                        </span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )
            }
            }
            </PlacesAutocomplete>
        </div>
    )

}