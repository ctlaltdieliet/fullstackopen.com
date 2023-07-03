import { createAnecdote } from '../reducers/anecdoteReducer';
import { useDispatch } from 'react-redux';


const AnecdoteForm = (props) => {
  const dispatch = useDispatch();
  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value
    console.log(content)
    
    dispatch(createAnecdote(content));
  }
    

 return (<div>
    <h2>New anecdote</h2>
    <form onSubmit={addAnecdote}>
      <input name="anecdote" />
      <button type="submit">add</button>
    </form>
    </div>)
    }
export default AnecdoteForm