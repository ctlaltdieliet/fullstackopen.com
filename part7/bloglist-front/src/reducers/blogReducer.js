import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs.js'
const initialState = ''

const blogSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {
        getBlogs(state, action) {
            return action.payload
        },
        addBlog(state, action) {
            state.push(action.payload)
        },
    },
})

export const { getBlogs, addBlog } = blogSlice.actions

export const initializeBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll()
        dispatch(getBlogs(blogs))
    }
}

export const createBlog = (blogToAdd) => {
    console.log('aaaa')
    return async (dispatch) => {
        const newBlog = await blogService.create(blogToAdd)
        dispatch(addBlog(newBlog))
    }
}
export const likeBlog = (blogToLike) => {
    return async (dispatch) => {
        await blogService.update(blogToLike)
        await dispatch(initializeBlogs())
    }
}
export const commentBlog = (blogId, comment) => {
    return async (dispatch) => {
        await blogService.addComment({ id: blogId, comment: comment })
        await dispatch(initializeBlogs())
    }
}

export const removeBlog = (blogToRemoveID) => {
    return async (dispatch) => {
        console.log('deleting blog', blogToRemoveID)
        await blogService.remove(blogToRemoveID)
        await dispatch(initializeBlogs())
    }
}
//

export default blogSlice.reducer
