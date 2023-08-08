//import { createContext, useReducer, useContext } from 'react'

import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
//import { useDispatch, useSelector } from 'react-redux'
import BlogForm from './components/BlogForm'

const App = () => {
  //const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [url, setURL] = useState('')
  const [author, setAuthor] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationClass, setNotificationClass] = useState('error')
  const [createVisible, setCreateVisible] = useState(false)
  const hideWhenVisible = { display: createVisible ? 'none' : '' }
  const showWhenVisible = { display: createVisible ? '' : 'none' }
  const [blogs, setBlogs] = useState([])

  function compareNumbers(a, b) {
    return b.likes - a.likes
  }

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      blogs.sort(compareNumbers)
      setBlogs(blogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      const blog = {
        title: title,
        author: author,
        url: url,
        likes: 0,
      }

      console.log('blog to create is ', blog)
      // eslint-disable-next-line no-unused-vars
      const blogCreated = await blogService.create({ blog })
      setNotificationClass('notification')
      setErrorMessage('a new blog ' + title + ' added by ' + author)
      setTimeout(() => {
        setErrorMessage(null)
        blogService.getAll().then((blogs) => setBlogs(blogs))
      }, 5000)
      /*        if (blogCreated){blogService.getAll().then(blogs =>
          setBlogs( blogs ))}
*/
    } catch (exception) {
      alert(exception, 'Something wenth wrong credentials')
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      console.log(user)
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception.code)
      //setNotificationClass("error")
      setErrorMessage('login failed, check your username/password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  if (user === null) {
    return (
      <div>
        <Notification message={errorMessage} className={notificationClass} />

        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              id="username"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id="password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id="loginbutton" type="submit">
            login
          </button>
        </form>
      </div>
    )
  } else {
    return (
      <div>
        <h2>blogs</h2>
        <Notification message={errorMessage} className={notificationClass} />
        {user.username} is logged in.
        <button onClick={handleLogout}>Logout</button>
        <div style={hideWhenVisible}>
          <button onClick={() => setCreateVisible(true)}>New blog</button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm
            handleCreate={handleCreate}
            setTitle={({ target }) => setTitle(target.value)}
            setAuthor={({ target }) => setAuthor(target.value)}
            setURL={({ target }) => setURL(target.value)}
            author={author}
            url={url}
            title={title}
          />
          <button onClick={() => setCreateVisible(false)}>cancel</button>
        </div>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} username={user.username} />
        ))}
      </div>
    )
  }
}
export default App
