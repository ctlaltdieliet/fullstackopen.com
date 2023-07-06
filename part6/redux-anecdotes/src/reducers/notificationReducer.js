import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    showNotification(state, action) {
      
      return action.payload
    },
    removeNotification() {
      return initialState
    },
  }
})
export const { showNotification, removeNotification } = notificationSlice.actions

export const setNotification = (notification, time) => {
  return async dispatch => {
    dispatch(showNotification(notification))
    setTimeout(() => {
      dispatch(removeNotification())
    }, time * 1000)
  }
}

export default notificationSlice.reducer