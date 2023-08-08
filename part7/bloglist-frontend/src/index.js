import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
//import './index.css'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
//import usernameReducer from './reducers/usernameReducer'
import notificationSlice from './reducers/notificationReducer'
const store = configureStore({
  reducer: {
    notification: notificationSlice,
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App/ >
  </Provider>
)
