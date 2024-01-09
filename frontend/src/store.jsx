import {configureStore} from '@reduxjs/toolkit'
import authReducer from './components/slices/authSlice'
import userReducer from './components/slices/userSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  }
})