import { useState } from 'react'
const Button = ({ handleClick, text }) => (  <button onClick={handleClick}>   {text}  </button>)
const Title= ({Title}) => {return (<h1>{Title}</h1>)}
  
const Averages = ({title,good,bad,neutral}) =>{
  const all=() => {return good+bad+neutral}
  const average=() => {return (good-bad)/all()}
  const positive=()=> {return good*100/all()}
  if (all()===0){
    return(
      <div>
         <Title Title={title} />
         <h2>No feedback given yet</h2> 
      </div>)
  }
  else {
    return(
      <div>
        <Title Title={title} />
        <strong>Good: </strong>{good}<br/><strong>Neutral: </strong>{neutral}<br/><strong>Bad: </strong>{bad}
        <p/>
        <strong>All: </strong>{all() }<br/><strong>Ave rage: </strong>{average()}<br/><strong>Positive:  </strong> {positive()} %
      </div>)
  }
}    

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const setGoodRating = () => setGood(good + 1)
  const setNeutralRating = () => setNeutral(neutral + 1)
  const setBadRating = () =>  setBad(bad + 1)
 
  return (
    <div>
      <Title Title="Give Feedback" />
      <Button text="Good" handleClick={setGoodRating} /> 
      <Button text="Neutral" handleClick={setNeutralRating} /> 
      <Button text="Bad" value="bad" handleClick={setBadRating} /> 
      <Averages title="Rate us" good={good} bad={bad} neutral={neutral}/>
  </div>
  )
}

export default App