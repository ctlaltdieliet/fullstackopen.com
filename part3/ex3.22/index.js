const express = require("express")
const app = express()
const morgan=require("morgan")
const cors = require("cors")
const personModel= require("./models/Person")

app.use(express.json())
app.use(cors())

app.use(express.static("build"))

app.use(express.json())
morgan.token("content", (req) => {
  return JSON.stringify(req.body)
})

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :content"
  )
)


app.get("/api/persons", (request, response) => {
  personModel.find({}).then(result => {
    response.json(result)
  })
})

app.get("/api/persons/:id", (request, response,next) => {
  const id = String(request.params.id)
  personModel.findById(id)
    .then( result => {
      console.log("result is ",result)
      if (result) {
        response.json(result)
      }
      else {
        console.log("nothing found")
        response.status(404).end()
      }
    })
    .catch(error=> next(error))
})



app.delete("/api/persons/:id", (request, response) => {
  const id = String(request.params.id)
  personModel.deleteOne({ _id:id })
    .then(response.status(204).end())
})


app.get("/api/info", (request, response) => {
  personModel.count({}, function( err, count){
    let toReturn= "Phonebook has info for "+count+ " people<br>"
    console.log(toReturn)
    response.send(toReturn)
  })
})



app.post("/api/persons/", (request, response,next) => {
  const body = request.body

  if (body.name === undefined) {
    return response.status(400).json({ error: "name missing" })
  }
  if (body.number === undefined) {
    return response.status(400).json({ error: "number missing" })
  }


  const person = new personModel({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedperson => {
    response.json(savedperson)
  })
    .catch(error => {
      next(error)
    })
})

app.put("/api/persons/:id", (request, response,next) => {
  const body = request.body

  if (body.name === undefined) {
    return response.status(400).json({ error: "name missing" })
  }
  if (body.number === undefined) {
    return response.status(400).json({ error: "number missing" })
  }


  const person = new personModel({
    name: body.name,
    number: body.number,
  })
  personModel.updateOne({ "name":person.name },{ "name":person.name, number:person.number })
    .then(result => {
      response.json(result)
    })
    .catch(error => {
      next(error)
    })
})


const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" })
  }
  else if (error.name === "ValidationError") {
    return response.status(400).json({ error: "te kort" })
  }

  next(error)
}

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method)
  console.log("Path:  ", request.path)
  console.log("Body:  ", request.body)
  console.log("---")
  next()
}

app.use(requestLogger)
app.use(errorHandler)



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

