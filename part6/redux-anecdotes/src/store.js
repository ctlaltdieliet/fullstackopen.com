import { configureStore } from '@reduxjs/toolkit' 

import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/FilterReducer'
import notificationReducer from './reducers/notificationReducer'

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notifications: notificationReducer,
  }
})

export default store