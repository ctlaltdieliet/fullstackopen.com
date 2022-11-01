import { useState } from 'react'
/*const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}
*/
const Button = ({ handleClick, text }) => (  <button onClick={handleClick}>   {text}  </button>)
const Title= ({Title}) => {return (<h1>{Title}</h1>)}
    

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const setGoodRating = () => setGood(good + 1)
  const setNeutralRating = () => setNeutral(neutral + 1)
  const setBadRating = () => setBad(bad + 1)

   

  return (
    <div>
      <Title Title="Give Feedback" />
      <Button text="Good" handleClick={setGoodRating} /> 
      <Button text="Neutral" handleClick={setNeutralRating} /> 
      <Button text="Bad" value="bad" handleClick={setBadRating} /> 
   
      <Title Title="Rate us" />
      <strong>Good: </strong>{good}<br/><strong>Neutral: </strong>{neutral}<br/><strong>Bad: </strong>{bad} 

    </div>
  )
}

export default App