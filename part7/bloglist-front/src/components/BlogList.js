import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
const byLikes = (b1, b2) => b2.likes - b1.likes

const BlogList = () => {
    const blogs = useSelector((state) => state.blogs)
    return (
        <div>
            {[...blogs].sort(byLikes).map((blog) => (
                <div key={blog.id}>
                    <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
                </div>
            ))}
        </div>
    )
}

export default BlogList
