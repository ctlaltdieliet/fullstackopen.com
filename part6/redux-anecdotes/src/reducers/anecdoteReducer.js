import { createSlice } from '@reduxjs/toolkit'
import anecdotes from '../services/anecdotes'
import anecdoteService from '../services/anecdotes'
const anecdotesAtStart = []

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}
const compareVotes = (a, b) => {
  return b.votes - a.votes
 }
const initialState = await anecdoteService.getAll()


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    
    appendAnecdote(state, action) {
      state.push(action.payload)
    }, 
    setAnecdotes(state, action) {
      return action.payload
    },
  }
})

export const { appendAnecdote,setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {    
    const anecdotes = await anecdoteService.getAll()
    anecdotes.sort(compareVotes)
    dispatch(setAnecdotes(anecdotes))  
  }
}

export const createAnecdote = content => {  
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)    
    const updatedAnecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(updatedAnecdotes))
}
}

export const voteUp = id => {
  console.log("register v")
  return async dispatch => {
  const anecdotes = await anecdoteService.getAll()
  const anecdoteToChange = anecdotes.find(n => n.id === id)
  const changedAnecdote = {
    ...anecdoteToChange,
    votes: anecdoteToChange.votes + 1
    }
  await anecdoteService.update(id, changedAnecdote)
  console.log(changedAnecdote)
  const updatedAnecdotes = await anecdoteService.getAll()
  dispatch(setAnecdotes(updatedAnecdotes))
  }     
}
export default anecdoteSlice.reducer