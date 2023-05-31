import { useState } from 'react'
import blogService from '../services/blogs'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}


const Blog = ({ blog,username }) => {
  const [visible, setVisible] = useState('')

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  //const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }



  const deleteButtonStyle = (blog.user.username=== username)?{ visibility:'visible' }:{ visibility:'hidden' }

  const voteUp = async() => {
    console.log('current likes=',blog.likes)
    try {
      const blogUpdate={
        'title': blog.title,
        'author': blog.author,
        'url': blog.url,
        'likes': blog.likes+1,
        user:blog.user.id
      }
      let id=blog.id
      const blogUpdated = await blogService.update(id,blogUpdate)
      console.log(blogUpdated)
    }
    catch(error){
      console.log(error)
    }
  }

  const deleteBlog = async() => {
    let delemete=window.confirm('Are you sure you want to delete '+blog.title+' by '+blog.author+'?')
    if (delemete){
      try{
        let id=blog.id
        console.log({ id })
        const blogRemoved = await blogService.remove(id)
        console.log(blogRemoved)
      }
      catch(error){
        console.log(error)
      }
    }
  }


  if (!visible){
    return(
      <div className='blog' style={blogStyle}>
        <span id="title"><a href={blog.url}>{blog.title}</a> </span> <button className='btnShow' onClick={toggleVisibility}>Show</button>
        <br/><span id="author">Author:{blog.author}</span>
        <span id="url" style={showWhenVisible}><br/><a href={blog.url}>{blog.url}</a></span>
        <span id="likes" className='likes' style={showWhenVisible} ><br/>Likes {blog.likes} <button id='bntLike' className='btnLike' onClick={voteUp}>Like </button></span>
        <br/>Added by {blog.user.username}
        <br/>
        <button id="deleteBtn" style={deleteButtonStyle} onClick={deleteBlog}>Remove</button>
      </div>
    )
  }
  else {
    return(
      <div className='blog' style={blogStyle}>
        <span id="title"><a href={blog.url}>{blog.title}</a> </span> <button className='btnShow' onClick={toggleVisibility}>Hide</button>
        <br/><span id="author">Author:{blog.author}</span>
        <br/><span id="url"><a href={blog.url}>{blog.url}</a></span>
        <br/><span id="likes" className='likes'>Likes {blog.likes} <button id='bntLike' className='bntLike' onClick={voteUp}>Like</button></span>
        <br/>Added by {blog.user.username}
        <br/>
        <button id="deleteBtn" style={deleteButtonStyle} onClick={deleteBlog}>Remove</button>
      </div>
    )
  }
}

export default Blog