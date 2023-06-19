import { useSelector,useDispatch } from 'react-redux'
import { voteUp } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()
  
  const voteUp3 = (id) => {
    dispatch(voteUp(id))  
  }
  
  
  return (
    anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => voteUp3(anecdote.id)}>vote</button>
      </div>
    </div>
    )
  )
}
export default AnecdoteList