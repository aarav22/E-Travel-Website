import { createSlice } from '@reduxjs/toolkit' 

const initialState = {
    userinfoObject: '', 
    // source: '',
    // destination: '', 
    // date: '',
    // returnDate: '',
    // numAdults: 0,
    // numChildren: 0,
    flightOffer:'', 

    // Traveller details:
    travellers: []


}

const flightSlice = createSlice({
    name: "flights",
    initialState,
    reducers: {
        flightItineary(state, action) {
            const userinfoObject = action.payload;
            state.userinfoObject = userinfoObject;
            // const {source, destination, date, returnDate, numAdults, numChildren} = action.payload;
            // state.source = source;
            // state.destination = destination; 
            // state.date = date; 
            // state.returnDate = returnDate;
            // state.numAdults = numAdults;
            // state.numChildren = numChildren;
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