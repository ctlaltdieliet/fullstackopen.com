import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

const add = async newObject => {
  const request = axios.post(baseUrl, newObject)
  const response = await request
  return response.data
}

const remove = async (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

const update = async (id,newObject) => {
  console.log("updating now to ",newObject)
  return  axios.put(`${baseUrl}/${id}/`,newObject )
  
}

export default { getAll, add, remove, update }