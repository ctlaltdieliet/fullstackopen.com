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

/*const delete = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}
*/
export default { getAll, add }