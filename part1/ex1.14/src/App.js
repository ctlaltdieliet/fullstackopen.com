import { useState } from 'react'


const Button = ({ handleClick,text }) => (  <button onClick={handleClick}>   {text}  </button>)

const Vote = ({selection,points}) => {
  return (<div>
    has {points[selection]} votes
  </div>)
}
const Title = ({title}) => {
  return <h3>{title}</h3>
}

const AnecdoteOftheDay = ({anecdoteToShow,highest}) => {
  return (
    <div>{anecdoteToShow} <br/>has {highest}  votes"</div>
  )
}
  

const App = () => {
  
  const [selected, setSelected] = useState(0)
  const [points, setVote] = useState({ 0: 0,1: 0,2: 0,3: 0,4: 0,5: 0, 6:0 })
  
  
  const MakeMeCry= ()=> {
    setSelected(Math.floor(Math.random() *anecdotes.length))
  }

  const AddAVote = () => {
    const copy = { ...points }
    copy[selected]=copy[selected]+1
    setVote(copy)
    }
  

    
  
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const HighestVote = () => {
    var anecdoteToShow=0
    const copy = { ...points }
    var highest=0;
    console.log(anecdotes.length)
    for (var i=0;i<anecdotes.length;i++) {
      console.log(i +"is key")
      if (copy[i]>=highest){
        highest=copy[i]
        anecdoteToShow=i
      }      
    }
    return (anecdoteToShow)
  } 
  

  
  return (
    <div>
      <Title title="Anecdote of the day" />
      {anecdotes[selected]}
      <Vote selection={selected} points={points} />
      <p/>
      <Button handleClick={MakeMeCry} text="Hit me one more time"/>
      <Button handleClick={AddAVote}  text="Vote for this anecdote"/>
      <Title title="Anecdote with the highest votes" />
      <AnecdoteOftheDay anecdoteToShow={anecdotes[HighestVote()]} highest={points[HighestVote()]} />
    </div>
  )
}

export default App