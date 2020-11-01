import React from 'react'; 
import axios from 'axios'
// import SearchBar from './searchbar/searchbar.component'
import SearchBar from './searchbar/searchbar.component'
import './homepage.component.css'
// import LinearGradient from 'react-native-linear-gradient'

export default function Homepage(props) { 
    if ("geolocation" in navigator) {
        console.log("Available");
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
        });
    } else {
        console.log("Not Available");
    }

    const API_Key = process.env.REACT_APP_API_KEY;
    axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=Vasant%Vihar&key=${API_Key}`)
    .then(res => {
        console.log("Response from google autocomplete: ", res); 
    })
    .catch(err => console.log("Error from autocomplete: ", err)); 

    return ( 
        <div className="home-main">
            
            <div className="search-box">
                <SearchBar></SearchBar>
            </div>
{/* 
        
       <View>
            <View>
            <Text className=  'text'>
                This is a gradiented text
            </Text>
            <Text className=  'text'>
                This is a gradiented text
            </Text>
            <Text className=  'text'>
                This is a gradiented text
            </Text>
            <Text style={styles.text}>
                This is a gradiented text
            </Text><Text style={styles.text}>
                This is a gradiented text
            </Text>
            </View>
            <LinearGradient className= 'gradient'
                start={{ x: 0.0, y: 0.0 }}
                end={{ x: 0.0, y: 1.0 }}
                locations={[0.0, 1.0]}
                colors={['#ffffff40', '#fffffff5']} //<-- last 2 chars from color control the opacity
                useViewFrame={false}
                style={styles.gradient}
            />
        </View> */}

        </div>
    )
}