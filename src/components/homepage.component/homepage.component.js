import React from 'react'; 
import SearchBar from './searchbar/searchbar.component'
import './homepage.component.css'
// import LinearGradient from 'react-native-linear-gradient'

export default function Homepage(props) { 
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