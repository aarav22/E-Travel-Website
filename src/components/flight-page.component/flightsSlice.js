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
            const {source, destination} = action.payload;
            state.source = source;
            state.destination = destination; 
        }
    }
});
export const { flightItineary } = flightSlice.actions;
// export const selectUser = state => state.user.isSignedIn;
export default flightSlice.reducer; 