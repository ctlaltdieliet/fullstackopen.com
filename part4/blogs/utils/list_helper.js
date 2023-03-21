const dummy = (blogs) => {
 return 1
}

const totalLikes = (blogs) => {
    i= blogs.reduce((total, blog) => {
        return total=total+blog.likes
    }, 0);
    return i
} 

const favoriteBlog = (blogs) => {
  mostFavoriteBlog= blogs.reduce(function(prev, current) {
    return  (prev.likes > current.likes) ? prev : current    
  })
  return mostFavoriteBlog
}

const mostBlogs = (blogs) => {
  let counts={}
  authors= blogs.map(function(blog){
    if (counts[blog.author]>0){counts[blog.author]++}
    else {counts[blog.author]=1}  
    return counts    
  })
  
  toreturn={author:"none", blogs:0}
  for (i in counts){
    if (counts[i]>toreturn.blogs){
      toreturn={author:i, blogs:counts[i]}
    }
  }
return toreturn  
}

const mostLikes = (blogs) => {
  let counts={}
  authors= blogs.map(function(blog){
    if (counts[blog.author]>0){counts[blog.author]=counts[blog.author]+blog.likes}
    else {counts[blog.author]=blog.likes}  
        
  })
  toreturn={author:"none", likes:0}
  for (i in counts){
    if (counts[i]>toreturn.likes){
      toreturn={author:i, likes:counts[i]}
    }
  }
return toreturn 
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}