import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotification(state, action) {
      console.log("")
      return action.payload
    },
    removeNotification() {
      return initialState
    },
  }
})

export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer