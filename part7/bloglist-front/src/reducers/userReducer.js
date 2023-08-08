import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import storageService from '../services/storage'

const initialState = ''

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addActiveUser(state, action) {
            console.log(action.payload)
            return action.payload
        },
        clearActiveUser() {
            return initialState
        },
    },
})
export const { addActiveUser, clearActiveUser } = userSlice.actions

export const loginUser = (username, password) => {
    return async (dispatch) => {
        console.log('logging in ', username)
        const user = await loginService.login({ username, password })
        storageService.saveUser(user)
        dispatch(addActiveUser(user))
    }
}

export const logoutUser = () => {
    return async (dispatch) => {
        storageService.removeUser()
        await loginService.clearUser()
        dispatch(clearActiveUser)
    }
}

export default userSlice.reducer
