import { createSlice } from '@reduxjs/toolkit'

const initialState = null

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


export const setNotification = (notification,type) => {
  return async dispatch => {
    dispatch(showNotification(notification,type))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }
}
export const { showNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer