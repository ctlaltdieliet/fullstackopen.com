import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => {  token = `Bearer ${newToken}`}

  

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
const create = async newObject => {
  const config = {    headers: { Authorization: token },  }
  console.log("new object is",newObject.blog)
  const response = await axios.post(baseUrl, newObject.blog, config)  
  return response.data
}
const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}
// eslint-disable-next-line import/no-anonymous-default-export
export default { 
  getAll, 
  create, 
  update,
  setToken
}
