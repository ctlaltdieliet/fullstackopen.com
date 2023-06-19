const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const voteUp = (id) => {
  return {
    type: 'voteUp',
    payload: { id }
  }
}  

export const createAnecdote = (content) => {
  return {
    type: 'createAnecdote',
    payload: {content: content, votes:0, id:getId }
  }
}  


const sortByVote= (anecdote1, anecdote2) => {
  console.log(anecdote1)
  return anecdote2.votes-anecdote1.votes
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {

  const voteUp2 = (anecdote) => {
    console.log('voting up anecdote', action)
    let newVotes=anecdote.votes
    if (action.payload.id===anecdote.id){newVotes++}
    return {
      content: anecdote.content,
      id: anecdote.id,
      votes: newVotes
    }
  
  }
  
  

 switch (action.type) {
    case 'voteUp':
      console.log('voting up1')
    state= state.map(voteUp2) 
    return state.sort(sortByVote)
    
    case 'createAnecdote':
      console.log('adding a note')
    state= state.concat([action.payload]) 
    return state.sort(sortByVote)
    
    default:
      return state
    }
}

export default reducer