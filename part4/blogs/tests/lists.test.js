const app = require('../index')
const mongoose = require('mongoose')
const supertest = require('supertest')
const api = supertest(app)
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const listHelper = require('../utils/list_helper')
const helper = require('./tests_helper')
const { is } = require('express/lib/request')
let token=""
const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    userId:"5a422a851b54a67677777777",

    __v: 0
  }
]
const blogs= [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    userId:"5a422a851b54a67677777777",
      
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    userId:"5a422a851b54a67677777777",
      
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    userId:"5a422a851b54a67677777777",
      
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    userId:"5a422a851b54a67677777777",
      
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    userId:"5a422a851b54a67677777777",
    likes: 0,      
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    userId:"5a422a851b54a67677777777",
    __v: 0
  }  
]

beforeEach(async () => {  
  await Blog.deleteMany({})  
  await User.deleteMany({})  
  
  let blogObject = new Blog(blogs[0])  
  await blogObject.save()  
  blogObject = new Blog(blogs[1]) 
  await blogObject.save()
  blogObject = new Blog(blogs[2])  
  await blogObject.save()  
  blogObject = new Blog(blogs[3]) 
  await blogObject.save()
  blogObject = new Blog(blogs[4])  
  await blogObject.save()  
  blogObject = new Blog(blogs[5]) 
  await blogObject.save()
  

})




describe('when there is initially one user in db', () => {
  beforeAll(async ()=>{
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ id:"5a422a851b54a67677777777",
    username: 'root', passwordHash })
    await user.save()
    const newUser = {
      username: 'root',
      password: 'sekret',
    }
  

    const logi = 
      await api
      .post('/api/login')
      .send(newUser)
      .expect(200)
    token=logi.body.token
  })


  test('create login', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with a too short username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mlu',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)

  })

test('creation fails with a too short password', async () => {
  const usersAtStart = await helper.usersInDb()

  const newUser = {
    username: 'mluaaaa',
    name: 'Matti Luukkainen',
    password: 'aa',
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    
  const usersAtEnd = await helper.usersInDb()
  expect(usersAtEnd).toHaveLength(usersAtStart.length)

})
})











describe ("crud operations on the api",()=>{

  test('a valid blog can be added', async () => {
    const newBlog = {
      _id: "66122b3a1b54a676234d17f9",
      title: "New Blog about SSL",
      author: "Tim Do Miir",
      url: "https://ssl.is/better",
      likes: 912,
      __v: 0
    }
     await api
      .post('/api/blogs')
      .set("Authorization" ,"Bearer "+ token)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
      const blogsAtEnd = await api
      .get('/api/blogs')
      .set("Authorization" ,"Bearer "+ token)  
    
      expect(blogsAtEnd.body).toHaveLength(blogs.length + 1)
    const contents = blogsAtEnd.body.map(n => n.title)
      expect(contents).toContain(
      'New Blog about SSL'
   )
  })
})
  
  test('a blog can not be added when missing a title', async () => {
    const newBlog = {
      _id: "666111b3a1b54a676234d17f9",
      author: "Tim Do Miir",
      url: "https://ssl.is/better",
      likes: 912,
      userId:"5a422a851b54a67677777777",
      __v: 0
    }
    await api
      .post('/api/blogs')
      .set("Authorization" , "bearer "+token)
      .send(newBlog)
      .expect(400)
      

    })
      test('a valid blog can not be added url', async () => {
        const newBlog = {
          _id: "666111b3a1b54a676234d17f9",
          author: "Tim Do Miir",
          title: "There is no url",
          likes: 91,
          __v: 0
        }
        await api
          .post('/api/blogs')
          .set("Authorization" , "bearer "+token)
          .send(newBlog)
          .expect(400)
          
      })
      test('a blog can be updated', async () => {
        console.log("token for update",token)
        const newBlog = {
          title: "React patterns",
          author: "Michael Chan",
          url: "https://reactpatterns.com/",
          likes: 8,
        }
        await api
          .put('/api/blogs/5a422a851b54a676234d17f7')
          .set("Authorization" , "bearer "+token)
          .send(newBlog)
          .expect(201)
          .expect('Content-Type', /application\/json/)
        const updatedBlog = await api
        .get('/api/blogs/5a422a851b54a676234d17f7')  
        .set("Authorization" , "bearer "+token)
        .send()
        //.expect(updatedBlog.likes).toEqual(8)
      })
    

      test('a valid blog can be deleted', async () => {
      
      
        const i=await api
        .delete('/api/blogs/5a422a851b54a676234d17f7')
        .set('Authorization', 'bearer ' + token)
        //.expect(204)
    
    const blogsAtEnd = await api
    .get('/api/blogs')
    .set("Authorization" , "bearer "+token)
    .send()   
    .expect(blogsAtEnd.body).toHaveLength(blogs.length - 1)
      })          


describe ("LIST OPERATIONS",()=>{

  test('returns zero likes', async()=> {
      const response = await api.get('/api/blogs/5a422ba71b54a676234d17fb')
      expect(response.body.likes).toEqual(0)
    })


  test('dummy returns one', async () => {
    const blogs = ["a"]

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })


  test('count blogs', async()=> {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(blogs.length)
  })


  test('returns id', async()=> {
    const response = await api.get('/api/blogs/5a422b891b54a676234d17fa')
    expect(response.body.id).toBeDefined()
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })


  test('Sum of likes array of blogs', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
})


  test('Most favorite blog', () => {
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(blogs[2])
  })


  test('Most active author', () => {
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual({
      author: "Robert C. Martin",
      blogs: 3
    })
  })

  test('Most liked author', () => {
    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17
    })
  })
})



  afterAll(async () => {

  await mongoose.connection.close()
})