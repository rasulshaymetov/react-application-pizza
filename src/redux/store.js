import { configureStore } from '@reduxjs/toolkit'
import countReducer from './slices/filterSlice' 
export const  store = configureStore({
  reducer: {counter: countReducer},
})