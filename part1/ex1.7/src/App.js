import { useState } from 'react'


const Button = ({ handleClick, text }) => (  <button onClick={handleClick}>   {text}  </button>)
const Title= ({Title}) => {return (<h1>{Title}</h1>)}  


const App = () => {  
  let average = 0 
  let all = 0 
  let positive= 0
  
  const calculate =() =>{
    all=good+bad+neutral; 
    if (all>0){ 
      average=(good-bad)/all
      positive=(good/all)*100;
      }
    }
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0);
  const setGoodRating = () => setGood(good + 1);calculate();
  const setNeutralRating = () => setNeutral(neutral + 1);calculate();
  const setBadRating = () => setBad(bad + 1);calculate();

  return (
    <div>
      <Title Title="Give Feedback" />
      <Button text="Good" handleClick={setGoodRating} /> 
      <Button text="Neutral" handleClick={setNeutralRating} /> 
      <Button text="Bad" value="bad" handleClick={setBadRating} /> 
      <Title Title="Rate us" />
      <strong>Good: </strong>{good}<br/><strong>Neutral: </strong>{neutral}<br/><strong>Bad: </strong>{bad}
      <Title Title="Averages" />
      <strong>All: </strong>{all}<br/><strong>Average: </strong>{average}<br/><strong>Positive: </strong>{positive} %
  </div>
  )
}

export default App