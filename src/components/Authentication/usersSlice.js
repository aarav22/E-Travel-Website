import { createSlice } from '@reduxjs/toolkit' 

const initialState = {
    isSignedIn: false,
    curr_user: null
}

const usersSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userSignedIn(state, action) {
            const {isSignedIn, user} = action.payload;
            state.isSignedIn = isSignedIn;
            state.curr_user = user; 
        }
    }
});
export const { userSignedIn } = usersSlice.actions;
// export const selectUser = state => state.user.isSignedIn;
export default usersSlice.reducer; 