import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import {Button} from 'react-bootstrap/'

import {
    initializeBlogs,
    likeBlog,
    commentBlog,
} from '../reducers/blogReducer'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from '../reducers/messageReducer'
import storageService from '../services/storage'
import { addActiveUser } from '../reducers/userReducer'

const BlogById = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeBlogs())
    }, [])
    useEffect(() => {
        const user = storageService.loadUser()
        dispatch(addActiveUser(user))
    }, [])
    const blogs = useSelector((state) => state.blogs)
    const id = useParams().id
    const [comment, setComment] = useState('')

    const notifyWith = (message, style) => {
        dispatch(setNotification(message, style))
    }

    if (blogs.length > 0) {
        const blog = blogs.find((thisBlog) => thisBlog.id === id)

        const addComment = async (event) => {
            event.preventDefault()
            setComment('')
            dispatch(commentBlog(blog.id, comment))
            dispatch(initializeBlogs())
        }

        const voteUp = async () => {
            console.log('current likes=', blog.likes)
            try {
                const blogToUpdate = { ...blog, likes: blog.likes + 1 }
                await dispatch(likeBlog(blogToUpdate))
                notifyWith(
                    `A like for the blog '${blog.title}' by '${blog.author}'`,
                    'info'
                )
            } catch (error) {
                console.log(error)
            }
        }

        const style = {
            marginBottom: 2,
            padding: 5,
            borderStyle: 'solid',
        }

        return (
            <div style={style} className="blog">
                <div className="p-2">{blog.title} - {blog.author}</div>
                <div>
                    <div>
                        {' '}
                        <a href={blog.url}> {blog.url}</a>{' '}
                    </div>
                    <div>
                        likes {blog.likes}{' '}
                        <Button onClick={voteUp}>Like</Button>
                    </div>
                    <h3>comments</h3>
                    <form onSubmit={addComment}>
                        <input
                            id="comment"
                            type="text"
                            value={comment}
                            name="comment"
                            onChange={({ target }) => setComment(target.value)}
                        />
                        <Button className="btn" id="add-comment" type="submit">
                            add comment
                        </Button>
                    </form>
                    <ul>
                        {blog.comments.map((c, index) => (
                            <li key={index}>{c}</li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    } else {
        return <div></div>
    }
}
export default BlogById
