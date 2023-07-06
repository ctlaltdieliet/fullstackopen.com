import { useSelector,useDispatch } from 'react-redux'
import { voteUp } from '../reducers/anecdoteReducer'
import { setNotification,removeNotification } from '../reducers/notificationReducer'
const AnecdoteList = () => {


  const dispatch = useDispatch()
const anecdotes= useSelector(state=> {
  console.log("a",state)
  
  if (state.filter===''){return state.anecdotes}
  else {
    return state.anecdotes.filter(function(item){
      return item.content.includes(state.filter)
    })
  }
})
  
  const voteUp3 = (id) => {
    console.log("you voted",id)
    dispatch(voteUp(id))
    dispatch(setNotification(`you voted "${anecdotes.find(n => n.id === id).content}"`, 10))
    
  }
  
  const anecdotesToSort = [...anecdotes]
  return (<div>
    {anecdotesToSort.sort((a, b) => b.votes - a.votes).map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => voteUp3(anecdote.id)}>vote</button>
      </div>
    </div>
  )}
  </div>
  )
}
export default AnecdoteList