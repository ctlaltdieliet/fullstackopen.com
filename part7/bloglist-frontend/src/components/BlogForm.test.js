import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'
import blogService from '../services/blogs'

test('creating a new blog', async () => {
  let author = ''
  let url = ''
  let title = ''
  const setTitle = (title_) => {
    title = title_
  }
  const setAuthor = (author_) => {
    author = author_
  }
  const setUrl = (url_) => {
    url = url_
  }

  const handleCreate2 = jest.spyOn(blogService, 'create')
  //const handleCreate2 = jest.fn()
  const handleCreate = async (event) => {
    event.preventDefault()
    const blog = {
      title: title,
      author: author,
      url: url,
      likes: 0,
    }
    await blogService.create({ blog })
  }

  render(
    <BlogForm
      handleCreate={handleCreate}
      setTitle={setTitle('testTitle')}
      setAuthor={setAuthor('testAuthor')}
      setURL={setUrl('https://www.google.be')}
      author="tom"
      url="https://www.google.be"
      title="title"
    />
  )
  const user = userEvent.setup()
  const buttonNew = screen.getByText('Create')
  await user.click(buttonNew)
  console.log('----------------------------------------------')
  console.log(handleCreate2.mock.calls[0][0].blog)
  console.log('===============================================')

  expect(handleCreate2.mock.calls[0][0].blog.title).toBe('testTitle')
  expect(handleCreate2.mock.calls[0][0].blog.author).toBe('testAuthor')
  expect(handleCreate2.mock.calls[0][0].blog.url).toBe('https://www.google.be')
})
