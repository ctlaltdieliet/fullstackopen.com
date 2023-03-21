const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')


blogRouter.get('/', async(request, response) => {
  console.log("getting all blogs")
  const blogs= await Blog
  .find({}).populate('userId',{username: 1, name: 1})
  response.json(blogs).end()  
})

blogRouter.get('/:id', async (request, response, next) => {
  const blog= await Blog.findById(request.params.id)
    try{
      if (blog) {
        if (!blog.likes){
          blog.likes=0
        }
        response.json(blog)
      } else {
        response.status(404).end()
      }
    }
    catch{(error => next(error))}
})

blogRouter.post('/', async (request, response, next) => {
  const body = request.body
  const user = request.user
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    userId: user.id
  })
if (!body.url){
  response.status(400).end()
}
else if (!body.title){
  response.status(400).end()
}
else if (!request.decodedToken.id){
  response.status(403).end()
}

else { 
     try {
      const savedBlog=  await blog.save() 
     // console.log("BLOG SAVED",savedBlog)
      user.blogs = user.blogs.concat(savedBlog.id)
      //console.log("user CONCATED")  
      await user.save()
      //console.log("user saved",user)
      //console.log("almost done",savedBlog)
      response.status(201).json(savedBlog)
      //console.log("DONE",savedBlog)
      //next()
    }
    catch{(error => response.status(400).json({"test":error}) )}
 }//END ELSE
  })


blogRouter.delete('/:id', async (request, response, next) => {
  const user = request.user
  const BlogId=request.params.id
  const BlogArticle = await Blog.findById(request.params.id)
  if (!request.decodedToken.id){
    response.status(403).end()
  }
  
  console.log("BlogArticle",request.params.id)
  if (user._id.toString()===BlogArticle.userId.toString()){
    console.log("yes do it baby")
    try {  
    await (Blog.findByIdAndRemove(BlogArticle.id))
    console.log("yes do it baby1",BlogArticle.id)
    response.status(204).json({"success":"ok"}).end()
  }
  catch{    console.log("yes do it baby3")
  error => next(error)}
}
else {
  response.status(403).end()
}
})

blogRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  if (!request.decodedToken.id){
    response.status(403).end()
  }
  
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })


  await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    try {(updatedBlog => {
      response.json(updatedBlog)
    })}
    catch{(error => next(error))}
})

module.exports = blogRouter