import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
import blogService from '../services/blogs'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'tom',
    url: 'https://www.google.be',
    user: { username: 'tompom' },
  }
  const username = 'tomdemoor'
  const { container } = render(<Blog blog={blog} username={username} />)

  const element = screen.getByText(
    'Component testing is done with react-testing-library'
  )
  expect(element).toBeDefined()

  const title = container.querySelector('#title')
  expect(title).toBeDefined()

  const author = container.querySelector('#author')
  expect(author).toBeDefined()

  const url = container.querySelector('#url')
  expect(url).toHaveStyle('display: none')

  const likes = container.querySelector('#likes')
  expect(likes).toHaveStyle('display: none')
})

test('clicking the button displays likes and url', async () => {
  const blog = {
    id: 'abcde',
    title: 'Component testing is done with react-testing-library',
    author: 'tom',
    url: 'https://www.google.be',
    user: { username: 'tompom' },
    likes: 3,
  }
  const username = 'tomdemoor'
  const { container } = render(<Blog blog={blog} username={username} />)
  const user = userEvent.setup()
  const button = screen.getByText('Show')
  await user.click(button)

  const url = container.querySelector('#url')
  expect(url).not.toHaveStyle('display: none')

  const likes = container.querySelector('#likes')
  expect(likes).not.toHaveStyle('display: none')
})

test('clicking the like button twice', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'tom',
    url: 'https://www.google.be',
    user: { username: 'tompom' },
  }
  const username = 'tomdemoor'
  const voteUp = jest.spyOn(blogService, 'update')
  render(<Blog blog={blog} username={username} />)
  const user = userEvent.setup()
  const button = screen.getByText('Like')
  await user.click(button)
  await user.click(button)
  //console.log('--------------------------')
  //console.log(voteUp.mock.calls)
  //console.log('--------------------------')

  expect(voteUp).toBeCalledTimes(2)
})
