const Blog = ({blog}) => (
  <div class="blog">
    <a href={blog.url}>{blog.title}</a> by {blog.author}
  </div>  
)

export default Blog