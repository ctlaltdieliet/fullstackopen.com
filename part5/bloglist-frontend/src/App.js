import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'



const App = () => {
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)  
  const [title, setTitle] = useState(null)  
  const [url, setURL] = useState(null)  
  const [author, setAuthor] = useState(null)  
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationClass, setNotificationClass] = useState("error")  
  
  const [blogs, setBlogs] = useState([])
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }  
  },[])

  const handleCreate = async (event) => {
    event.preventDefault()
      try {
        const blog={
          "title": title,
          "author": author,
          "url": url,
          "likes": 0,
      
        }

        console.log("blog to create is ",blog)
        // eslint-disable-next-line no-unused-vars
        const blogCreated = await blogService.create({blog})
        setNotificationClass("notification")
        setErrorMessage("a new blog "+title+" added by "+author)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
/*        if (blogCreated){blogService.getAll().then(blogs =>
          setBlogs( blogs ))}
*/

      } catch (exception) {
          alert(exception, 'Something wenth wrong credentials')
        } 
  }

  const handleLogout= ()=>{
    window.localStorage.clear()
    setUser(null)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
      try {
        const user = await loginService.login({
          username, password,
        })
        console.log(user)
        window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user)      ) 
        setUser(user)
        setUsername('')
        setPassword('')
      } catch (exception) {
        console.log(exception.code)
        //setNotificationClass("error")
        setErrorMessage("login failed, check your username/password")
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
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
        </form>      
      </div>
    )
  }
else {
  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} className={notificationClass} />

      {user.username} is logged in.<button onClick={handleLogout}>Logout</button>
    
    <h2> Create new</h2>
    <form onSubmit={handleCreate}>
    Title: <input type="text" name="title"  value={title} onChange={({ target }) => setTitle(target.value)} /><br/>
    Author: <input type="author" name="author"  value={author} onChange={({ target }) => setAuthor(target.value)} /><br/>
    URL: <input type="url" name="url"  value={url} onChange={({ target }) => setURL(target.value)}/><br/>
    <button type="submit">Create</button>
    </form>
    <p/>
    {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}
}
export default App