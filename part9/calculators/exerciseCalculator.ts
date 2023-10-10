/*interface TrainingResults {
  periodLength: number;
  trainingDays: number;
  success: boolean
  rating: number;
  target: number;
  ratingDescription: string;
  average: number;
}
*/

export const calculateExercises = (  target: number,
  days: Array<number>)=>{

  const argsNumbers  = days.map(function(day) {
    return Number(day)
  })
  
  const targetValue=target
  
  const trainingDaysArray=argsNumbers
  const periodLength=trainingDaysArray.length
  const numberOfTrainingDaysArray= trainingDaysArray.filter((arg) => Number(arg) > 0)
  const trainingDays=numberOfTrainingDaysArray.length
  const sumHours = trainingDaysArray.reduce((partialSum, a) => partialSum + a, 0)
  const average= sumHours/periodLength
  const success=average>=targetValue
  let rating
  if (sumHours*1.2<=targetValue){
    rating=1
  }
  else if (sumHours/1.2<=targetValue){
    rating=3
  }
  else {
    rating=2
  }
  const ratingDescription=[]
  ratingDescription[1]="You are simply the best, better than all the rest!"
  ratingDescription[2]="You are quite average, that is safe!"
  ratingDescription[3]="You are going too fast"


  console.log("target value is",target)

  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    target: target,
    ratingDescription: ratingDescription[rating],
    average: average,
  }
}

/*try {
  console.log(calculateExercises(process.argv))
  
} catch (error: unknown) {
  let errorMessage = "Something bad happened."
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message
  }
  console.log(errorMessage)
}
*/