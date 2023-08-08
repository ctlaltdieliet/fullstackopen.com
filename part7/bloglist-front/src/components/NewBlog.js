import { useState } from 'react'
import {Button} from 'react-bootstrap/'
import Form from 'react-bootstrap/Form'

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()
        await createBlog({ title, author, url })
    }

    return (
        <div>
            <h4>Create a new blog</h4>

            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        id="title"
                        placeholder="title"
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Author</Form.Label>
                    <Form.Control
                        id="author"
                        placeholder="author"
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Url</Form.Label>
                    <Form.Control
                        id="url"
                        placeholder="url"
                        value={url}
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </Form.Group>
                <Button type="submit">create</Button>
            </Form>
        </div>
    )
}

export default BlogForm
