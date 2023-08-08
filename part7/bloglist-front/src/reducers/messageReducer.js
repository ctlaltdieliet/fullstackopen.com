import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const messageSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        showNotification(state, action) {
            return action
        },
        removeNotification() {
            return initialState
        },
    },
})
export const { showNotification, removeNotification } = messageSlice.actions

export const setNotification = (message, style) => {
    return async (dispatch) => {
        dispatch(showNotification({ style: style, message: message }))
        setTimeout(() => {
            dispatch(removeNotification())
        }, 5000)
    }
}

export default messageSlice.reducer
