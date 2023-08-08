import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import { configureStore } from '@reduxjs/toolkit'
import messageSlice from './reducers/messageReducer'
import blogSlice from './reducers/blogReducer'
import userSlice from './reducers/userReducer'
import usersSlice from './reducers/usersReducer'

const store = configureStore({
    reducer: {
        notification: messageSlice,
        blogs: blogSlice,
        user: userSlice,
        users: usersSlice,
    },
})

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>
)
