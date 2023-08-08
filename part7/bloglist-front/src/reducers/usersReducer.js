import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'

const initialState = ''

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        getUsers(state, action) {
            console.log('all users are actoin ', action)
            return action.payload
        },
        getOne() {
            return initialState
        },
    },
})
export const { getUsers, getOne } = usersSlice.actions

export const getAllUsers = async () => {
    return async (dispatch) => {
        const users = await usersService.getAll()
        dispatch(getUsers(users))
    }
}


export default usersSlice.reducer
