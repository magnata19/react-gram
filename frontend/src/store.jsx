import {configureStore} from '@reduxjs/toolkit'
import authReducer from './components/slices/authSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer
  }
})