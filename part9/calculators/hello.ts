/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from "express"
import {bmiCalculator} from "./bmiCalculator"
import {calculateExercises} from "./exerciseCalculator"
const app = express()
app.use(express.json())

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack")
})

app.get("/bmi", (req, res) => {
  try {
    const weight= Number(req.query.weight)
    const height= Number(req.query.height)
    if (isNaN(weight) || isNaN(height)) throw new Error("malformatted parameters")
    const bmi=bmiCalculator(height,weight)
    res.json({weight:weight,height:height,bmi:bmi})
  }
  catch (error: unknown) {
    if (error instanceof Error) {
      res.json({error: error.message})
    }
    else {
      res.json({error: "Something went wrong"})
    }
  }
})


app.post("/exercises", (req, res) => {
  try {
    const body = req.body
    const targetValue=body.target
    const daily_exercises=body.daily_exercises
    const toreturn=calculateExercises(targetValue,daily_exercises)
    res.json(toreturn)
  }
  catch (error: unknown) {
    if (error instanceof Error) {
      res.json({error: error.message})
    }
    else {
      res.json({error: "Something went wrong"})
    }
  }
})


const PORT = 3002

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
