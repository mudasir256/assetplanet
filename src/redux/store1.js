import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './rootReducer'
import loginReducer from './slices/loginSlice'


const store = configureStore({
  reducer: {
    rootReducer 
  },
})

export default store