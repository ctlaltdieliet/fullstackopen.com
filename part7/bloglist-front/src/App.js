import { useEffect, useRef } from 'react'
import BlogById from './components/BlogById'
import BlogList from './components/BlogList'
import {Button} from 'react-bootstrap/'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import storageService from './services/storage'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from './reducers/messageReducer'

import LoginForm from './components/Login'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'

import {
    initializeBlogs,
    createBlog
} from './reducers/blogReducer'
import {
    loginUser,
    addActiveUser,
    clearActiveUser,
} from './reducers/userReducer'
import { getUsers } from './reducers/usersReducer'
import usersServices from './services/users'

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

const allUsersAreGood =  usersServices.getAll()
const App = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    const info = useSelector((state) => state.info)

    const blogFormRef = useRef()

    useEffect(() => {
        const user = storageService.loadUser()
        dispatch(addActiveUser(user))
    }, [])

    useEffect(() => {
        dispatch(initializeBlogs())
    }, [])

    useEffect(() => {
        dispatch(getUsers(allUsersAreGood))
    }, [])

    const notifyWith = (message, style) => {
        dispatch(setNotification(message, style))
    }

    const login = async (username, password) => {
        try {
            //const user = await loginService.login({ username, password });
            // const user = await loginService.login({ username, password });
            dispatch(loginUser(username, password))
            //storageService.saveUser(user);
            notifyWith('welcome!')
        } catch (e) {
            notifyWith('wrong username or password', 'error')
        }
    }

    const logout = async () => {
        dispatch(clearActiveUser())
        notifyWith('logged out')
    }

    const createBlog2 = async (newBlog) => {
        await dispatch(createBlog(newBlog))

        notifyWith(`A new blog '${newBlog.title}' by '${newBlog.author}' added`)
        blogFormRef.current.toggleVisibility()
    }


    if (!user) {
        return (
            <div>
                <h2>log in to application</h2>
                <Notification info={info} />
                <LoginForm login={login} />
            </div>
        )
    }

    const Home = () => {
        return (
            <div>
                <Togglable buttonLabel="Create New Blog" ref={blogFormRef}>
                    <NewBlog createBlog={createBlog2} />
                </Togglable>
                <div>
                    <BlogList />
                </div>
            </div>
        )
    }

    return (
        <Router>
            <div className="container">
                <h2>blogs</h2>
                <Notification info={info} />
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#" as="span">
                                {' '}
                                <Link to="/">home</Link>
                            </Nav.Link>
                            <Nav.Link href="#" as="span">
                                <Link to="/blogs">blogs</Link>
                            </Nav.Link>
                            <Nav.Link href="#" as="span">
                                {' '}
                                <Link to="/users">users</Link>
                            </Nav.Link>
                            {user ? (
                                <em>Hi there {user.name} </em>
                            ) : (
                                <Nav.Link href="#" as="span">
                                    <Link to="/login">login</Link>
                                </Nav.Link>
                            )}{' '}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <div>
                    {user.name} logged in
                    <Button variant='link' onClick={logout}>logout</Button>
                </div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/user/:id" element={<User />} />
                    <Route path="/blog/:id" element={<BlogById />} />
                    <Route path="/" element={<Home />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App
