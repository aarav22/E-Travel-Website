import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../components/Authentication/usersSlice'
import flightReducer from '../components/flight-page.component/flightsSlice'


export default configureStore({
    reducer: {
        user: userReducer,
        flight: flightReducer
    }
})
