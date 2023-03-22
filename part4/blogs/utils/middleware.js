const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')


let decodedToken=""

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}


const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  //response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name ===  'JsonWebTokenError') {
    return response.status(400).json({ error: "jwt----"+error.message })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired'    })
  }

  next(error)
}

const tokenExtractor = async (request,response,next)=>{
  decodedToken = await jwt.verify(getTokenFrom(request), process.env.SECRET)  
  request.decodedToken=decodedToken
  next()
  //console.log("middleware decoded token=",decodedToken)
  /*request.token=decodedToken;
  if (!request.decodedToken.) {
    return response.status(401).json({ error: 'token invalid' })
    }
    else {request.token=decodedToken; next()} 
*/
}

const userExtractor = async (request,response,next)=>{
 const user = await User.findById(request.decodedToken.id)
     request.user=user;
     next()
}



module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}