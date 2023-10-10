interface MultiplyValues {
  value1: number;
  value2: number;
}

const parseArguments = (args: string[]): MultiplyValues => {
  if (args.length < 4) throw new Error("Not enough arguments")
  if (args.length > 4) throw new Error("Too many arguments")

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    }
  } else {
    throw new Error("Provided values were not numbers!")
  }
}

export const bmiCalculator = (a: number, b: number) => {
  const bodyLength=a/100
  const weight=b
  const bmi=weight/(bodyLength^2)
  if (bmi<18.5){
    return "Underweight"
  }
  else if (bmi > 25) {
    return "Overweight"
  }
  else {
    return "Healthy weigth"
  }
  
}

try {
  const { value1, value2 } = parseArguments(process.argv)
  console.log(bmiCalculator(value1, value2))
} catch (error: unknown) {
  let errorMessage = "Something bad happened."
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message
  }
  console.log(errorMessage)
}

