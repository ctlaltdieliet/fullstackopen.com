import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import { useNotificationDispatch } from './NotificationContext'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const updateVoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })

  const handleVote = (anecdote) => {
    updateVoteMutation.mutate({ ...anecdote, votes: anecdote.votes +=1})
    dispatch({type: 'NOTIFICATION', payload: `You voted for " ${anecdote.content}" `})
    setTimeout(() => {dispatch({type: 'CLEAR'})}, 5000)
  }

  const result = useQuery(
    'anecdotes', getAnecdotes,
    {
      retry: 1
    }
  )
  console.log(result)

  if (result.isLoading) {
    return <div>retreiving data please hold</div>
  }
  if (result.error) {
    return <div>Oops, we broke the internet</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm  queryClient={queryClient}/>
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
