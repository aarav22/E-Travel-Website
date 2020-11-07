import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../components/Authentication/usersSlice'

export default configureStore({
    reducer: {
        user: userReducer
    }
})
