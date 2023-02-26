const mongoose = require("mongoose")

const url =
    "mongodb+srv://fullstack:${password}@cluster0.zuajnxx.mongodb.net/?retryWrites=true&w=majority"


mongoose.set("strictQuery",false)
mongoose.connect(url)
mongoose.set("debug", true)


const personSchema = new mongoose.Schema({
  name:  {
    type: String,
    minLength: 3,
    required: true
  },
  number: String,
})


personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model("Person", personSchema)