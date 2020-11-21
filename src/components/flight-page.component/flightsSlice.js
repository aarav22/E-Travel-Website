import { createSlice } from '@reduxjs/toolkit' 

const initialState = {
    source: '',
    destination: ''
}

const flightSlice = createSlice({
    name: "flights",
    initialState,
    reducers: {
        flightItineary(state, action) {
            const {source, destination, date} = action.payload;
            state.source = source;
            state.destination = destination; 
            state.date = date; 
        }
    }
});
export const { flightItineary } = flightSlice.actions;
// export const selectUser = state => state.user.isSignedIn;
export default flightSlice.reducer; 