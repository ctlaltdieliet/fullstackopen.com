import PropTypes from 'prop-types'
const BlogForm = ({
  handleCreate,
  setTitle,
  setAuthor,
  setURL,
  title,
  author,
  url,
}) => {
  return (
    <div>
      <h2> Create new</h2>
      Title:{' '}
      <input
        type="text"
        name="title"
        id="title"
        value={title}
        onChange={setTitle}
      />
      <br />
      Author:{' '}
      <input
        type="author"
        name="author"
        id="author"
        value={author}
        onChange={setAuthor}
      />
      <br />
      URL:{' '}
      <input type="url" name="url" id="url" value={url} onChange={setURL} />
      <br />
      <button onClick={handleCreate} id="create">
        Create
      </button>
      <br />
    </div>
  )
}

BlogForm.propTypes = {
  handleCreate: PropTypes.func.isRequired,
  setTitle: PropTypes.func.isRequired,
  setAuthor: PropTypes.func.isRequired,
  setURL: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
}

export default BlogForm
