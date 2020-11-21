import { createSlice } from '@reduxjs/toolkit' 

const initialState = {
    source: '',
    destination: '', 
    date: '',
    flightOffer:'', 

    // Traveller details:
    travellers: []


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
        },

        flightOffer(state, action) {
            const offer = action.payload;
            state.flightOffer = offer; 
        }
    }
});
export const { flightItineary, flightOffer } = flightSlice.actions;
// export const selectUser = state => state.user.isSignedIn;
export default flightSlice.reducer; 