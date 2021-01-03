import { createSlice } from '@reduxjs/toolkit' 

const initialState = {
    userinfoObject: '', 
    // source: '',
    // destination: '', 
    // date: '',
    // returnDate: '',
    // numAdults: 0,
    // numChildren: 0,
    singleFlightOffer:'', 
    returnFlightOffer:'',
    numBookings: 2789002,
    userRec: [],

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
            state.singleFlightOffer = offer.singleFlightOffer; 
            state.returnFlightOffer = offer.returnFlightOffer;
        }, 

        numBooking(state, action) {
            const numBookings = action.payload;
            state.numBookings = numBookings;
        },

        travellersInfo(state, action) {
            const travellerInfo = action.payload;
            state.travellers = travellerInfo;
        },

        userRecommendations(state, action) {
            state.userRec = action.payload;
        }
        
    }
});
export const { flightItineary, flightOffer, numBooking, travellersInfo , userRecommendations} = flightSlice.actions;
export default flightSlice.reducer; 