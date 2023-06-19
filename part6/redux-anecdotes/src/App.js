//import { useSelector, useDispatch } from 'react-redux'
//import { createAnecdote, voteUp } from './reducers/anecdoteReducer'
//import reducer from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = () => {
  
  return (
    <div>
      <h2>Anecdotes</h2>
      
      
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App