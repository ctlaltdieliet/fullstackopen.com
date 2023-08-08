import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const User = () => {
    const id = useParams().id
    const users = useSelector((state) => state.users)
    const userInfo = users.find((user) => user.id === id)
    const blogs = userInfo.blogs.map((blog, counter) => {
        return <li key={counter}>{blog.title}</li>
    })

    return (
        <div>
            <h2>{userInfo.name}</h2>
            <h3>Added blogs</h3>
            <ul>{blogs}</ul>
        </div>
    )
}

export default User
